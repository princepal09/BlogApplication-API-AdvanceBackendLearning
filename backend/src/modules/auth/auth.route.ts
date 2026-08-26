import express from "express";
import { registerUserController,loginUserController, refreshTokenController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginUserSchema, refreshTokenSchema, registerUserSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserController);
router.post("/login", validate(loginUserSchema), loginUserController);
router.post("/refreshToken", validate(refreshTokenSchema), refreshTokenController);

export default router;
