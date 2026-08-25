import express from "express";
import { registerUserController,loginUserController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserController);
router.post("/login", validate(loginUserSchema), loginUserController);

export default router;
