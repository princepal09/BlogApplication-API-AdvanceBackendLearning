import express from "express";

import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { createPostController, deletePost, getUserPosts, updatePost } from "./post.controller.js";
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
router.patch("/:postId", verifyUser(authService), validate(updatePostSchema),  updatePost);
router.delete("/delete/:postId", verifyUser(authService), deletePost);

export default router;
