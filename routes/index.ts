import router from "../config/router.config.ts";
import userRoute from "./user.routes.ts";

router.use("/api/user", userRoute);

export default router;
