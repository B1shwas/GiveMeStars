import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { roleSchema } from "../lib/validations";
import prisma from "../config/prisma.config";

const addRole = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = roleSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      message: parsedData.error.message,
    });
  }

  const { name, code } = parsedData.data;

  const alreadyExistedRole = await prisma.role.findUnique({
    where: {
      roleCode: code,
    },
  });

  if (alreadyExistedRole) {
    return res.status(400).json({
      success: false,
      message: "Role already exists",
    });
  }

  try {
    await prisma.role.create({
      data: {
        name,
        roleCode: code,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Role created successfully",
  });
});

export {addRole}