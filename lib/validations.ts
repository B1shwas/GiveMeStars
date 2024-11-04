import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(6, { message: "Username is required" }),
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  ACCESS_TOKEN_SECRET: z.string().min(16),
  REFRESH_TOKEN_SECRET: z.string().min(16),
  PORT: z
    .string()
    .default("3000")
    .transform((val) => parseInt(val)),
});

export const loginSchema = userSchema.pick({
  username: true,
  password: true,
});
