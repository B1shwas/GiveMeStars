import router from "../config/router.config";
import userRoute from "./user.routes";
import feedbackRoute from "./feedback.routes";

router.use("/api/user", userRoute);
router.use("/api/feedback", feedbackRoute);

export default router;
