import { Request, Response } from "express";
import prisma from "../config/prisma.config";
import { reviewAndRatingSchema } from "../lib/validations";
import { asyncHandler } from "../utils/asyncHandler";

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}
const giveTeacherReview = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { teacherId } = req.params;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const parsedData = reviewAndRatingSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: parsedData.error.flatten().fieldErrors,
      });
    }

    const { rating, review } = parsedData.data;

    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        teacherId_studentId: {
          teacherId: teacherId,
          studentId: student.id,
        },
      },
    });

    const existingReview = await prisma.review.findUnique({
      where: {
        teacherId_studentId: {
          teacherId: teacherId,
          studentId: student.id,
        },
      },
    });

    const newRating = existingRating
      ? await prisma.rating.update({
          where: {
            id: existingRating.id,
          },
          data: {
            rating,
          },
        })
      : await prisma.rating.create({
          data: {
            rating,
            teacherId: teacherId,
            studentId: student.id,
          },
        });

    const newReview = existingReview
      ? await prisma.review.update({
          where: {
            id: existingReview.id,
          },
          data: { review },
        })
      : await prisma.review.create({
          data: {
            review,
            teacherId: teacherId,
            studentId: student.id,
          },
        });

    if (!newReview || !newRating) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    return res.status(201).json({
      message: "Review and rating submitted successfully",
      success: true,
      data: { newReview, newRating },
    });
  }
);

export { giveTeacherReview };
