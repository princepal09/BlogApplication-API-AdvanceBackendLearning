import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL } from "./config/config.js";
import errorMiddleware from "./middlewares/globalErrorHandler.middleware.js";
import authRouter from "./modules/auth/auth.route.js";
import postRouter from "./modules/post/post.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);

app.get("/health-check", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "APi is working fine!",
  });
});

app.use(errorMiddleware);

export default app;
