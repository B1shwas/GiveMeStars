import prisma from "../config/prisma.config";
import { loginSchema, userSchema } from "../lib/validations";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshToken } from "../utils/generateAccessAndRefreshToken";
import jwt from "jsonwebtoken";
import env from "../config/env.config";

import { ApiError } from "../utils/ApiError";
import { registerSchema } from "../lib/validations";
import { handleResponse } from "../utils/handleResponse";
import { cookieOptions } from "../utils/cookieOptions";

const registerUser = asyncHandler(async (req, res) => {
  const parsedData = registerSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      success: false,
      message: parsedData.error.flatten().fieldErrors,
    });
    return;
  }

  const { username, email, password, fullname, role } = parsedData.data;

  const duplicate = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
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
    const newUser = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email,
        password: hashedPassword,
        fullname,
        roles: [parseInt(role)],
      },
    });

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
    return res.status(400).json({
      success: false,
      message: parsedData.error.flatten().fieldErrors,
    });
  }

  const token = req.cookies?.refreshtoken;
  const { username, password } = parsedData.data;

  const availableUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() },
      ],
    },
  });

  if (
    !availableUser ||
    !(await bcrypt.compare(password, availableUser.password))
  ) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const info = { id: availableUser.id, username: availableUser.username };
  const { accessToken, refreshToken } = generateAccessAndRefreshToken(info);

  if (token) {
    const tokenFound = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!tokenFound || tokenFound.userId !== availableUser.id) {
      await prisma.refreshToken.deleteMany({
        where: {
          OR: [{ userId: availableUser.id }, { userId: tokenFound?.userId }],
        },
      });

      res.clearCookie("refreshtoken", {
        ...cookieOptions,
      });

      throw new ApiError(401, "Unauthorized");
    }

    await prisma.refreshToken.delete({ where: { token } });
    res.clearCookie("refreshtoken", {
      ...cookieOptions,
    });
  }

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: availableUser.id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.cookie("refreshtoken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return handleResponse(res, { accessToken }, 200, "Successfully logged in");
});

const refreshTheToken = asyncHandler(async (req, res): Promise<void> => {
  const incomingRefreshToken = req.cookies.refreshtoken || req.body;

  if (!incomingRefreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.clearCookie("refreshtoken", cookieOptions);

  const tokenFound = await prisma.refreshToken.findUnique({
    where: {
      token: incomingRefreshToken,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: tokenFound?.userId,
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
          await prisma.refreshToken.deleteMany({
            where: {
              userId: hackedUser.id,
            },
          });
        }
      }
    );
    res.sendStatus(403);
    return;
  }

  jwt.verify(
    incomingRefreshToken,
    env.REFRESH_TOKEN_SECRET,
    async (err: any, decoded: any | undefined) => {
      if (err) {
        await prisma.refreshToken.delete({
          where: {
            token: incomingRefreshToken,
          },
        });
        return;
      }

      if (err || user.username !== decoded.username) {
        return res.sendStatus(403);
      }

      const info = { id: user.id, username: user.username };

      const { accessToken, refreshToken } = generateAccessAndRefreshToken(info);

      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
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

  if (!token) {
    res.status(204).send();
    return;
  }

  const foundToken = await prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });

  if (!foundToken) {
    res.clearCookie("refreshtoken", {
      ...cookieOptions,
    });
    res.status(204).send();
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: foundToken.userId,
    },
  });

  if (!user) {
    res.clearCookie("refreshtoken", {
      ...cookieOptions,
    });
    res.status(204).send();
    return;
  }

  await prisma.refreshToken.delete({
    where: {
      token,
    },
  });

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
