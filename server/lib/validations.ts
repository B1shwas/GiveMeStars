import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(5, { message: "Username name must be of 5 length" }),
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),

  role: z.enum(["1799", "0110", "9999", "1400", "0045", "0105"], {
    message: "Invalid role code",
  }),
  pincode: z.number().min(6).max(6),
  country: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
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

export const registerSchema = userSchema.pick({
  username: true,
  email: true,
  password: true,
  fullname: true,
  role: true,
});

export const reviewAndRatingSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().min(1).max(500),
});

export const replyFeedbackSchema = z.object({
  reply: z.string().min(1).max(500),
});

export const roleSchema = z.object({
  name: z.string().min(1),
  code: z
    .string()
    .length(4, { message: "Code must be of 4 digit number" })
    .regex(/^\d{4}$/, { message: "Code must be of 4 digit number" }),
});

export const schoolSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email({ message: "Invalid email address" }),
  description: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  pincode: z.string().min(1),
  passcode: z
    .string()
    .length(8) // Ensure the password is exactly 8 characters long
    .regex(/^[A-Za-z0-9]+$/, "Password must contain only letters and numbers."),
});
