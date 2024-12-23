import router from "../config/router.config";
import userRoute from "./user.routes";
import feedbackRoute from "./feedback.routes";

import { verifyJWT } from "../middlewares/auth.middleware";

router.use("/api/user", userRoute);
router.use("/api/feedback", feedbackRoute);
// router.use("/api/school", verifyJWT([1799, 9999]), schoolRoute);

export default router;
