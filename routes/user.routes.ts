import { verifyJWT } from "../middlewares/auth.middleware.ts";
import router from "../config/router.config.ts";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.ts";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", verifyJWT, logoutUser);

export default router;
