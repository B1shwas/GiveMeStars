import prisma from "../config/prisma.config";
import { loginSchema, userSchema } from "../lib/validations";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshToken } from "../utils/generateAccessAndRefreshToken";
import jwt from "jsonwebtoken";
import env from "../config/env.config";
import { createRoleEntry } from "../utils/roleUtil";
import { ApiError } from "../utils/ApiError";

const registerUser = asyncHandler(async (req, res) => {
  const parsedData = userSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      success: false,
      message: parsedData.error.flatten().fieldErrors,
    });
    return;
  }

  const { username, email, password, fullname, roleCode } = parsedData.data;

  const duplicate = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (duplicate) {
    res.status(409).json({ message: "User already exists", success: false });
    return;
  }

  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", success: false });
    return;
  }

  await prisma.$transaction(async (prisma) => {
    const role = await prisma.role.findUnique({
      where: { roleCode },
    });

    if (!role) {
      res.status(400).json({ message: "Role does not exist", success: false });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email,
        password: hashedPassword,
        fullname,
        roles: {
          connect: {
            roleCode,
          },
        },
      },
    });

    await createRoleEntry(prisma, roleCode, newUser.id);

    const createdUser = await prisma.user.findUnique({
      where: { id: newUser.id },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        roles: true,
      },
    });

    console.log(createdUser);

    if (!createdUser) {
      res.status(500).json({ message: "Something went wrong", success: false });
      return;
    }

    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
      success: true,
    });
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const parsedData = loginSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      success: false,
      message: parsedData.error.flatten().fieldErrors,
    });
    return;
  }

  const token = req.cookies?.refreshtoken;
  const { username, password } = parsedData.data;

  const availableUser = await prisma.user.findUnique({ where: { username } });
  if (!availableUser) {
    res.status(404).json({ message: "User not found", success: false });
    return;
  }
  const isPasswordValid = await bcrypt.compare(
    password,
    availableUser.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const info = { id: availableUser.id, username: availableUser.username };

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(info);

  let newRefreshTokenArray = !token
    ? availableUser.refreshToken
    : availableUser.refreshToken.filter((rt) => rt !== token);

  if (token) {
    const foundToken = await prisma.user.findFirst({
      where: {
        refreshToken: {
          has: token,
        },
      },
    });

    if (foundToken?.username !== availableUser?.username) {
      await prisma.user.update({
        where: { id: foundToken?.id },
        data: { refreshToken: [] },
      });

      await prisma.user.update({
        where: { id: availableUser.id },
        data: { refreshToken: [] },
      });

      res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res.status(403).json({
        message: "Forbidden: Found another user already logged into the system",
        success: false,
      });
    }

    console.log("user", foundToken);

    if (!foundToken) {
      newRefreshTokenArray = [];
    }
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }

  await prisma.user.update({
    where: { id: availableUser.id },
    data: { refreshToken: [...newRefreshTokenArray, refreshToken] },
  });

  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User logged in successfully",
    accessToken,
    success: true,
  });
});

const refreshTheToken = asyncHandler(async (req, res): Promise<void> => {
  const incomingRefreshToken = req.cookies.refreshtoken || req.body;

  if (!incomingRefreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.clearCookie("refreshtoken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  const user = await prisma.user.findFirst({
    where: {
      refreshToken: {
        has: incomingRefreshToken,
      },
    },
  });

  if (!user) {
    jwt.verify(
      incomingRefreshToken,
      env.REFRESH_TOKEN_SECRET,
      async (err: any, decoded: any | undefined) => {
        if (err) return res.sendStatus(403);
        const hackedUser = await prisma.user.findUnique({
          where: { username: decoded.username },
        });
        if (hackedUser) {
          hackedUser.refreshToken = [];
          await prisma.user.update({
            where: { id: hackedUser.id },
            data: {
              refreshToken: [],
            },
          });
        }
      }
    );
    res.sendStatus(403);
    return;
  }

  const newRefreshTokenArray = user.refreshToken.filter(
    (rt) => rt !== incomingRefreshToken
  );

  jwt.verify(
    incomingRefreshToken,
    env.REFRESH_TOKEN_SECRET,
    async (err: any, decoded: any | undefined) => {
      if (err) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            refreshToken: [...newRefreshTokenArray],
          },
        });
        return;
      }

      if (err || user.username !== decoded.username) {
        return res.sendStatus(403);
      }

      const info = { id: user.id, username: user.username };

      const { accessToken, refreshToken } = generateAccessAndRefreshToken(info);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: [...newRefreshTokenArray, refreshToken] },
      });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res
        .status(200)
        .json({ message: "Refreshed the token", accessToken: accessToken });
    }
  );
});

const logoutUser = asyncHandler(async (req, res): Promise<void> => {
  const token = req.cookies?.refreshtoken || req.body.refreshToken;
  console.log(token);

  if (!token) {
    res.status(204).send();
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      refreshToken: {
        has: token,
      },
    },
  });

  console.log(user);

  if (!user) {
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.status(204).send();
    return;
  }

  const updatedRefreshTokenArray = user.refreshToken.filter(
    (rt) => rt !== token
  );

  console.log("updated", updatedRefreshTokenArray);

  const updated = await prisma.user.update({
    //@ts-ignore
    where: { id: user.id },
    data: { refreshToken: updatedRefreshTokenArray },
  });

  console.log(updated);

  res
    .status(200)
    .clearCookie("refreshtoken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    })
    .json({
      message: "User logged out successfully",
      success: true,
    });
});

export { registerUser, loginUser, logoutUser, refreshTheToken };
