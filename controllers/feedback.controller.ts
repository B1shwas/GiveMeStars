import { Request, Response } from "express";
import prisma from "../config/prisma.config";
import { reviewAndRatingSchema } from "../lib/validations";
import { asyncHandler } from "../utils/asyncHandler";

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

const giveTeacherReviewAndRating = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { teacherId } = req.params;

    const student = await prisma.student.findUnique({
      where: {
        userId: req.user!.id,
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

    // Check for existing feedback
    const existingFeedback = await prisma.feedback.findUnique({
      where: {
        teacherId_studentId_userId: {
          teacherId: teacherId,
          studentId: student.id,
          userId: req.user!.id,
        },
      },
    });

    if (existingFeedback) {
      // Update existing feedback
      const updatedFeedback = await prisma.feedback.update({
        where: { id: existingFeedback.id },
        data: {
          rating,
          review,
        },
      });
      return res.status(200).json({
        message: "Feedback updated successfully",
        success: true,
        data: updatedFeedback,
      });
    } else {
      // Create new feedback
      const newFeedback = await prisma.feedback.create({
        data: {
          rating,
          review,
          teacherId,
          studentId: student.id,
          userId: req.user!.id,
        },
      });
      return res.status(201).json({
        message: "Feedback submitted successfully",
        success: true,
        data: newFeedback,
      });
    }
  }
);

const updateReviewAndRating = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { feedbackId } = req.query;

    if (!feedbackId) {
      return res.status(400).json({
        message: "Feedback ID is required",
      });
    }

    const feedbackToBeUpdated = await prisma.feedback.findUnique({
      where: { id: feedbackId as string },
    });

    if (!feedbackToBeUpdated) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    const isAuthorized = feedbackToBeUpdated.userId === req.user!.id;

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this feedback",
      });
      
    }

    const parsedData = reviewAndRatingSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: parsedData.error.flatten().fieldErrors,
      });
    }

    const { review: newReview, rating: newRating } = parsedData.data;

    try {
      await prisma.feedback.update({
        where: { id: feedbackId as string },
        data: {
          rating: newRating,
          review: newReview,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback updated successfully.",
    });
  }
);

export { giveTeacherReviewAndRating, updateReviewAndRating };
