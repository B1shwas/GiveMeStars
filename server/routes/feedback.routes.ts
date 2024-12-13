import { verifyJWT } from "../middlewares/auth.middleware";
import router from "../config/router.config";
import {
  deleteReply,
  deleteReviewAndRating,
  giveTeacherReviewAndRating,
  replyToFeedback,
  // updateReviewAndRating,
} from "../controllers/feedback.controller";
import { verify } from "crypto";

router.post("/add/:teacherId", verifyJWT(["110"]), giveTeacherReviewAndRating);
// router.put("/update", verifyJWT(["student"]), updateReviewAndRating); // Looked like , this updating the feedback can be performed by using same api from the giveTeacherReviewAndRating ..
// not going to delete it right now ... maybe use later if i wanted to add superadmin to update other's feedback
// not sure if that updation function is needed .. can be removed later if it didn't come to use

router.delete("/delete", verifyJWT(["110"]), deleteReviewAndRating);
router.post("/reply", verifyJWT(["1799"]), replyToFeedback);
router.delete("/delete-reply", verifyJWT(["1799"]), deleteReply);

export default router;
