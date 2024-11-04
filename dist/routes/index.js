"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_config_1 = __importDefault(require("../config/router.config"));
const user_routes_1 = __importDefault(require("./user.routes"));
router_config_1.default.use("/api/user", user_routes_1.default);
exports.default = router_config_1.default;
