import router from "../config/router.config";
import userRoute from "./user.routes";
import feedbackRoute from "./feedback.routes";
import roleRoute from "./role.routes";
import schoolRoute from "./school.routes";
import { verifyJWT } from "../middlewares/auth.middleware";

router.use("/api/user", userRoute);
router.use("/api/feedback", feedbackRoute);
router.use("/api/role", verifyJWT(["superadmin"]), roleRoute);
router.use("/api/school", verifyJWT(["teacher", "superadmin"]), schoolRoute);

export default router;
