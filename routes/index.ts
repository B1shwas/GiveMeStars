import router from "../config/router.config";
import userRoute from "./user.routes";

router.use("/api/user", userRoute);

export default router;
