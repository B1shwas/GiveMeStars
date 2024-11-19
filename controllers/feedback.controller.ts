import { CustomRequest, Response } from "../lib/types";
import prisma from "../config/prisma.config";
import { replyFeedbackSchema, reviewAndRatingSchema } from "../lib/validations";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { handleResponse } from "../utils/handleResponse";

// Helper function to fetch student
const fetchStudent = async (userId: string) => {
  const student = await prisma.student.findUnique({ where: { userId } });
  if (!student) throw new ApiError(404, "Student not found");
  return student;
};

// Helper function to fetch teacher
const fetchTeacher = async (teacherId: string) => {
  const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
  if (!teacher) throw new ApiError(404, "Teacher not found");
  return teacher;
};

// Helper function to validate feedback ID
const validateFeedbackId = async (feedbackId: string) => {
  const feedback = await prisma.feedback.findUnique({
    where: { id: feedbackId },
  });
  if (!feedback) throw new ApiError(404, "Feedback not found");
  return feedback;
};

// Helper function to check authorization
const checkAuthorization = (userId: string, feedbackUserId: string) => {
  if (userId !== feedbackUserId)
    throw new ApiError(403, "You are not authorized to perform this action");
};

const giveTeacherReviewAndRating = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { teacherId } = req.params;

    const student = await fetchStudent(req.user!.id);

    const parsedData = reviewAndRatingSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new ApiError(
        400,
        JSON.stringify(parsedData.error.flatten().fieldErrors)
      );
    }

    const { rating, review } = parsedData.data;

    const teacher = await fetchTeacher(teacherId);

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
      return handleResponse(
        res,
        updatedFeedback,
        200,
        "Feedback updated successfully"
      );
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
      return handleResponse(
        res,
        newFeedback,
        201,
        "Feedback created successfully"
      );
    }
  }
);

// const updateReviewAndRating = asyncHandler(
//   async (req: CustomRequest, res: Response) => {
//     const { feedbackId } = req.query;

//     if (!feedbackId) {
//       return res.status(400).json({
//         message: "Feedback ID is required",
//       });
//     }

//     const feedbackToBeUpdated = await prisma.feedback.findUnique({
//       where: { id: feedbackId as string },
//     });

//     if (!feedbackToBeUpdated) {
//       return res.status(404).json({
//         success: false,
//         message: "Feedback not found",
//       });
//     }

//     const isAuthorized = feedbackToBeUpdated.userId === req.user!.id;

//     if (!isAuthorized) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this feedback",
//       });
//     }

//     const parsedData = reviewAndRatingSchema.safeParse(req.body);

//     if (!parsedData.success) {
//       return res.status(400).json({
//         success: false,
//         message: parsedData.error.flatten().fieldErrors,
//       });
//     }

//     const { review: newReview, rating: newRating } = parsedData.data;

//     try {
//       await prisma.feedback.update({
//         where: { id: feedbackId as string },
//         data: {
//           rating: newRating,
//           review: newReview,
//         },
//       });
//     } catch (error) {
//       return res.status(500).json({
//         message: error,
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Feedback updated successfully.",
//     });
//   }
// );

const deleteReviewAndRating = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { feedbackId } = req.query;
    const userId = req.user!.id;

    if (!feedbackId) {
      throw new ApiError(400, "Feedback ID is required");
    }

    const feedbackToBeDeleted = await validateFeedbackId(feedbackId as string);

    checkAuthorization(userId, feedbackToBeDeleted.userId!);

    try {
      await prisma.feedback.delete({
        where: { id: feedbackId as string },
      });
    } catch (error) {
      throw new ApiError(500, "Something went wrong");
    }

    return handleResponse(res, null, 200, "Feedback deleted successfully");
  }
);

const replyToFeedback = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.user!.id;
    const { feedbackId } = req.query;

    // Validate the incoming data
    const parsedData = replyFeedbackSchema.safeParse(req.body);
    if (!parsedData.success) {
      throw new ApiError(
        400,
        JSON.stringify(parsedData.error.flatten().fieldErrors)
      );
    }

    const { reply } = parsedData.data;

    // Check if feedbackId is provided
    if (!feedbackId || typeof feedbackId !== "string") {
      throw new ApiError(400, "Feedback ID is required");
    }

    // Validate feedback ID and check if feedback exists
    const feedback = await validateFeedbackId(feedbackId);

    // Fetch the teacher based on userId
    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    // Check if the teacher is authorized to reply to the feedback
    checkAuthorization(feedback.teacherId!, teacher!.id);

    // Update the feedback with the reply
    await prisma.feedback.update({
      where: { id: feedbackId },
      data: { reply },
    });

    // Return a success response
    return handleResponse(res, null, 200, "Reply added successfully");
  }
);

const deleteReply = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user!.id;
  const { feedbackId } = req.query;

  if (!feedbackId) {
    throw new ApiError(400, "Feedback ID is required");
  }

  const feedback = await validateFeedbackId(feedbackId as string);

  const teacher = await prisma.teacher.findUnique({
    where: {
      userId,
    },
  });

  checkAuthorization(feedback.teacherId!, teacher!.id);

  try {
    await prisma.feedback.update({
      where: {
        id: feedbackId as string,
      },
      data: {
        reply: null,
      },
    });
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }

  return handleResponse(res, null, 200, "Reply deleted successfully");
});

export {
  giveTeacherReviewAndRating,
  deleteReviewAndRating,
  replyToFeedback,
  deleteReply,
};
