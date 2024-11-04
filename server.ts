import env from "./config/env.config.ts";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = env.PORT;

app.use(
  cors({
    origin: "http://localhost:6000", // Adjust as needed
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes
import routes from "./routes/index.ts";
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
