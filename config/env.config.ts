import { config } from "dotenv";

import { envSchema } from "../lib/validations.ts";

config();

const env = envSchema.parse(process.env);

export default env;
