import { verifyJWT } from "../middlewares/auth.middleware";
import router from "../config/router.config";
import {
  giveTeacherReviewAndRating,
  updateReviewAndRating,
} from "../controllers/feedback.controller";

router.post(
  "/add/:teacherId",
  verifyJWT(["student"]),
  giveTeacherReviewAndRating
);
router.put("/update", verifyJWT(["student"]), updateReviewAndRating);

export default router;
