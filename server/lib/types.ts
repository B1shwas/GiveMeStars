import { Request, Response, NextFunction } from "express";

type CustomRequest = Request & { user?: { id: string } };

export { CustomRequest, Response, Request, NextFunction };
