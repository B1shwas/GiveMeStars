import { verifyJWT } from "../middlewares/auth.middleware";
import router from "../config/router.config";
import { giveTeacherReview } from "../controllers/reviewAndRating.controller";

router.post("/add/:teacherId", verifyJWT(["student"]), giveTeacherReview);

export default router;
