import env from "./config/env.config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
import routes from "./routes/index";
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
