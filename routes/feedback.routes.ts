import { verifyJWT } from "../middlewares/auth.middleware";
import router from "../config/router.config";
import {
  deleteReply,
  deleteReviewAndRating,
  giveTeacherReviewAndRating,
  replyToFeedback,
  // updateReviewAndRating,
} from "../controllers/feedback.controller";

router.post(
  "/add/:teacherId",
  verifyJWT(["student"]),
  giveTeacherReviewAndRating
);
// router.put("/update", verifyJWT(["student"]), updateReviewAndRating); // Looked like , this updating the feedback can be performed by using same api from the giveTeacherReviewAndRating ..
// not going to delete it right now ... maybe use later if i wanted to add superadmin to update other's feedback
// not sure if that updation function is needed .. can be removed later if it didn't come to use

router.delete("/delete", verifyJWT(["student"]), deleteReviewAndRating);
router.post("/reply", verifyJWT(["teacher"]), replyToFeedback);
router.delete("/delete-reply", verifyJWT(["teacher"]), deleteReply);

export default router;
