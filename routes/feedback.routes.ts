import { verifyJWT } from "../middlewares/auth.middleware";
import router from "../config/router.config";
import {
  deleteReviewAndRating,
  giveTeacherReviewAndRating,
  updateReviewAndRating,
} from "../controllers/feedback.controller";

router.post(
  "/add/:teacherId",
  verifyJWT(["student"]),
  giveTeacherReviewAndRating
);
router.put("/update", verifyJWT(["student"]), updateReviewAndRating);
router.delete("/delete", verifyJWT(["student"]), deleteReviewAndRating);

export default router;
