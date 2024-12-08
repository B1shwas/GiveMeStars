"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
const validations_1 = require("../lib/validations");
const asyncHandler_1 = require("../utils/asyncHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateAccessAndRefreshToken_1 = require("../utils/generateAccessAndRefreshToken");
const registerUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsedData = validations_1.userSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            success: false,
            message: parsedData.error.flatten().fieldErrors,
        });
        return;
    }
    const { username, email, password, fullname } = parsedData.data;
    const duplicate = await prisma_config_1.default.user.findUnique({
        where: {
            username,
        },
    });
    if (duplicate) {
        res.status(409).json({ message: "User already exists", success: false });
        return;
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt_1.default.hash(password, 10);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
        return;
    }
    const newUser = await prisma_config_1.default.user.create({
        data: {
            username: username.toLowerCase(),
            email,
            password: hashedPassword,
            fullname,
        },
    });
    const createdUser = await prisma_config_1.default.user.findUnique({
        where: { id: newUser.id },
        select: { id: true, username: true, email: true, fullname: true },
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
exports.registerUser = registerUser;
const loginUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const parsedData = validations_1.loginSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            success: false,
            message: parsedData.error.flatten().fieldErrors,
        });
        return;
    }
    const { username, password } = parsedData.data;
    const isUserAvailable = await prisma_config_1.default.user.findUnique({ where: { username } });
    if (!isUserAvailable) {
        res.status(404).json({ message: "User not found", success: false });
        return;
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, isUserAvailable.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials", success: false });
        return;
    }
    const { accessToken, refreshToken } = await (0, generateAccessAndRefreshToken_1.generateAccessAndRefreshToken)(isUserAvailable.id);
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("accesstoken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });
    res.status(200).json({
        message: "User logged in successfully",
        accessToken,
        success: true,
    });
});
exports.loginUser = loginUser;
const logoutUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await prisma_config_1.default.user.update({
        //@ts-ignore
        where: { id: req.user.id },
        data: { refreshToken: null },
    });
    res
        .status(200)
        .clearCookie("refreshtoken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    })
        .clearCookie("accesstoken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
        .json({
        message: "User logged out successfully",
        success: true,
    });
});
exports.logoutUser = logoutUser;
