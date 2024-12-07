import { addRole } from "../controllers/role.controller";
import router from "../config/router.config";

router.post("/create", addRole);

export default router;
