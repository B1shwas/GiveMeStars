"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
const verifyJWT = async (req, res, next) => {
    try {
        let token = req.cookies?.accesstoken || req.headers.authorization;
        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.default.ACCESS_TOKEN_SECRET);
        const user = await prisma_config_1.default.user.findUnique({
            where: {
                id: decoded.userId,
            },
            select: {
                id: true,
                email: true,
                username: true,
            },
        });
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        //@ts-ignore
        req.user = user;
        next();
    }
    catch (error) {
        console.error("JWT verification error:", error);
        res.status(403).json({ message: "Forbiddoen" });
        return;
    }
};
exports.verifyJWT = verifyJWT;
