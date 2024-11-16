import env from "./config/env.config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend's origin
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // Allowed headers
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
import routes from "./routes/index";
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
