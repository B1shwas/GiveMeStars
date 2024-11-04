import { verifyJWT } from "../middlewares/auth.middleware";
import router from "../config/router.config";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", verifyJWT, logoutUser);

export default router;
