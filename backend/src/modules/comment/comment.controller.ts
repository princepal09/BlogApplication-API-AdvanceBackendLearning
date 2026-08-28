import { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { commentService } from "./comment.container.js";
import ApiError from "../../utils/ApiError.js";

export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req;
    const { postId } = req.params;

    if (!userId) {
      throw new ApiError(400, "User Id not found");
    }
    if (!postId) {
      throw new ApiError(404, "Post id not found");
    }

    const result = await commentService.createComment(
      req.body,
      postId as string,
      userId as string,
    );

    return res
      .status(201)
      .json(new ApiResponse(200, result, "Comment created successfully"));
  },
);
export const getAllCommentsByPost = asyncHandler(
  async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
      throw new ApiError(404, "Post id not found");
    }

    const result = await commentService.getAllCommentsByPost(postId as string);

    return res
      .status(201)
      .json(new ApiResponse(200, result, "Comments fetched successfully"));
  },
);
