"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.envSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(6, { message: "Username is required" }),
    fullname: zod_1.z.string().min(1, { message: "Full name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});
exports.envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    ACCESS_TOKEN_SECRET: zod_1.z.string().min(16),
    REFRESH_TOKEN_SECRET: zod_1.z.string().min(16),
    PORT: zod_1.z
        .string()
        .default("3000")
        .transform((val) => parseInt(val)),
});
exports.loginSchema = exports.userSchema.pick({
    username: true,
    password: true,
});
