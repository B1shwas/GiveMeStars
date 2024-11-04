import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.config";
import prisma from "../config/prisma.config";

const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token = req.cookies?.accesstoken || req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
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
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(403).json({ message: "Forbiddoen" });
    return;
  }
};

export { verifyJWT };
