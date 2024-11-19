import { addSchool } from "../controllers/school.controller";
import router from "../config/router.config";

router.post("/add", addSchool);

export default router;
