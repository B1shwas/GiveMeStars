import prisma from "../config/prisma.config";
import { loginSchema, userSchema } from "../lib/validations";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshToken } from "../utils/generateAccessAndRefreshToken";

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({
        success: false,
        message: parsedData.error.flatten().fieldErrors,
      });
      return;
    }

    const { username, email, password, fullname } = parsedData.data;

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

    const newUser = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email,
        password: hashedPassword,
        fullname,
      },
    });

    const createdUser = await prisma.user.findUnique({
      where: { id: newUser.id },
      select: { id: true, username: true, email: true, fullname: true },
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
  }
);

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = loginSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      success: false,
      message: parsedData.error.flatten().fieldErrors,
    });
    return;
  }

  const { username, password } = parsedData.data;

  const isUserAvailable = await prisma.user.findUnique({ where: { username } });
  if (!isUserAvailable) {
    res.status(404).json({ message: "User not found", success: false });
    return;
  }
  const isPasswordValid = await bcrypt.compare(
    password,
    isUserAvailable.password
  );

  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid credentials", success: false });
    return;
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    isUserAvailable.id
  );

  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accesstoken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    message: "User logged in successfully",
    accessToken,
    success: true,
  });
});

const logoutUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    await prisma.user.update({
      //@ts-ignore
      where: { id: req.user.id },
      data: { refreshToken: null },
    });

    res
      .status(200)
      .clearCookie("refreshtoken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .clearCookie("accesstoken", {
        httpOnly: true,
        secure: true,
      })
      .json({
        message: "User logged out successfully",
        success: true,
      });
  }
);

export { registerUser, loginUser, logoutUser };
