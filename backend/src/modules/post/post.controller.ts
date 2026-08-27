import { asyncHandler } from "../../utils/AsyncHandler.js";
import { Request, Response } from "express";
import postService from "./post.container.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const createPostController = asyncHandler(
  async (req: Request, res: Response) => {
    const { body, userId, file } = req;

    let result;
    if (req.file?.path) {
      result = await postService.createPost(
        body,
        userId as string,
        file?.path as string,
      );
    } else {
      result = await postService.createPost(body, userId as string);
    }

    return res.json(new ApiResponse(201, result, "Post created successfully"));
  },
);
