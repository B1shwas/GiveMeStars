import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.config";
import prisma from "../config/prisma.config";

const verifyJWT =
  (role?: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let token = req.cookies?.refreshtoken || req.headers.authorization;

      if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as {
        id: string;
      };

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
      });

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      if (role && !role.includes(user.role.toLowerCase())) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      //@ts-ignore
      req.user = user;
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(403).json({ message: "Forbidden" });
      return;
    }
  };

export { verifyJWT };
