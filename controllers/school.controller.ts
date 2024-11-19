import { schoolSchema } from "../lib/validations";
import { CustomRequest, Request, Response } from "../lib/types";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import prisma from "../config/prisma.config";
import { handleResponse } from "../utils/handleResponse";

const addSchool = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { id: userID } = req.user!;
  const parsedData = schoolSchema.safeParse(req.body);
  if (!parsedData.success) {
    throw new ApiError(
      400,
      JSON.stringify(parsedData.error.flatten().fieldErrors)
    );
  }

  const {
    city,
    state,
    address,
    email,
    phone,
    description,
    country,
    pincode,
    passcode,
    name,
  } = parsedData.data;

  try {
    const school = await prisma.school.create({
      data: {
        city,
        state,
        address,
        email,
        phone,
        description,
        country,
        pincode,
        passcode,
        name,
        createdBy: userID,
      },
    });
    const adminRole = await prisma.role.findUnique({
      where: {
        name: "ADMIN",
      },
    });

    if (!adminRole) {
      await prisma.role.create({
        data: {
          name: "ADMIN",
          roleCode: "9956",
        },
      });
    }

    await prisma.user.update({
      where: { id: userID },
      data: {
        roles: {
          connect: {
            name: "ADMIN",
          },
        },
      },
    });
    return handleResponse(res, school, 201, "School Created Successfully");
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
});

export { addSchool };
