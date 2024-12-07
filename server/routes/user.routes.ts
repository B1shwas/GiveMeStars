import router from "../config/router.config";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTheToken,
} from "../controllers/user.controller";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshTheToken);

export default router;
