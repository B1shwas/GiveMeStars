import env from "../config/env.config";
import prisma from "../config/prisma.config";
import jwt from "jsonwebtoken";

export const generateAccessAndRefreshToken = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new Error("User not found");

  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { accessToken, refreshToken };
};
