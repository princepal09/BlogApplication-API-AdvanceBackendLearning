import express from "express";
import {
  registerUserController,
  loginUserController,
  refreshTokenController,
  currentUserController,
  logoutController,
  logoutAllController,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "./auth.schema.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "./container.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserController);
router.post("/login", validate(loginUserSchema), loginUserController);
router.post(
  "/refreshToken",
  validate(refreshTokenSchema),
  refreshTokenController,
);
router.get("/me", verifyUser(authService), currentUserController);
router.post("/logout", verifyUser(authService), logoutController);
router.post(
  "/logout-all-devices",
  verifyUser(authService),
  logoutAllController,
);

export default router;
