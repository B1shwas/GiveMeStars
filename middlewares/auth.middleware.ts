import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.config";
import prisma from "../config/prisma.config";

interface Role {
  id: string;
  name: string;
  roleCode: string;
}

interface User {
  id: string;
  username: string;
  email: string | null; // Allowing email to be null
  roles: Role[]; // Array of Role objects
}

interface CustomRequest extends Request {
  user?: User; // Now user is of type User
}

const verifyJWT =
  (allowedRoles?: string[]) =>
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token =
      req.cookies?.refreshtoken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as {
        id: string;
      };
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, username: true, roles: true },
      });

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const userRoles = user.roles.map((role) => role.name.toLowerCase());
      const hasPermission = allowedRoles
        ? allowedRoles.every((role) => userRoles.includes(role.toLowerCase()))
        : true;

      if (!hasPermission) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      // Assign user to req.user
      req.user = user; // This is valid as user is of type User
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  };

export { verifyJWT };
