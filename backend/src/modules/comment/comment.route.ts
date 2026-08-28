import express from "express";
import { createComment, getAllCommentsByPost } from "./comment.controller.js";
import { authService } from "../auth/auth.container.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create/post/:postId", verifyUser(authService), createComment)
router.get("/get-all/:postId", verifyUser(authService), getAllCommentsByPost)

export default router;
