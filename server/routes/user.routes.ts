import { verifyJWT } from "../middlewares/auth.middleware";
import router from "../config/router.config";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTheToken,
} from "../controllers/auth.controller";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT(), logoutUser);
router.post("/refresh", verifyJWT(), refreshTheToken);

export default router;
