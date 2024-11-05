import env from "../config/env.config";
import jwt from "jsonwebtoken";

export const generateAccessAndRefreshToken = (user: {
  id: string;
  username: string;
}): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(user, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(user, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
