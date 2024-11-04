import { config } from "dotenv";

import { envSchema } from "../lib/validations";

config();

const env = envSchema.parse(process.env);

export default env;
