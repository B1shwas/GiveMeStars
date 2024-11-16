import router from "../config/router.config";
import userRoute from "./user.routes";
import reviewRoute from "./review.routes";

router.use("/api/user", userRoute);
router.use("/api/review", reviewRoute);

export default router;
