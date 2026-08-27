import express from "express";

import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema } from "./post.schema.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { createPostController, getUserPosts } from "./post.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/create",
  verifyUser(authService),
  upload.single("media"),
  validate(createPostSchema),
  createPostController,
);

router.get("/your-posts", verifyUser(authService), getUserPosts);

export default router;
