"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const validations_1 = require("../lib/validations");
(0, dotenv_1.config)();
const env = validations_1.envSchema.parse(process.env);
exports.default = env;
