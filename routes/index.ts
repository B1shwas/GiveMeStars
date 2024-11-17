import router from "../config/router.config";
import userRoute from "./user.routes";
import feedbackRoute from "./feedback.routes";
import roleRoute from "./role.routes";

router.use("/api/user", userRoute);
router.use("/api/feedback", feedbackRoute);
router.use("/api/role", roleRoute);

export default router;
