import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
  path: "./config/config.env",
});
const app = express();
// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_LOCAL, process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);
// Importing & Using Routes

import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

export default app;

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(
    `<h1>Server is working. click <a href=${process.env.NODE_ENV === 'development' ? process.env.FRONTEND_URL_LOCAL : process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  );
});
app.use(ErrorMiddleware);
