"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router_config_1 = __importDefault(require("../config/router.config"));
const user_controller_1 = require("../controllers/user.controller");
router_config_1.default.post("/register", user_controller_1.registerUser);
router_config_1.default.post("/login", user_controller_1.loginUser);
router_config_1.default.delete("/logout", auth_middleware_1.verifyJWT, user_controller_1.logoutUser);
exports.default = router_config_1.default;
