"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessAndRefreshToken = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessAndRefreshToken = async (userId) => {
    const user = await prisma_config_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new Error("User not found");
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, env_config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, env_config_1.default.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    await prisma_config_1.default.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });
    return { accessToken, refreshToken };
};
exports.generateAccessAndRefreshToken = generateAccessAndRefreshToken;
