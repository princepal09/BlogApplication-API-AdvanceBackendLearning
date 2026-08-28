import { asyncHandler } from "../../utils/AsyncHandler.js";
import { Request, Response } from "express";
import postService from "./post.container.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

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

export const getUserPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await postService.gerPostsByUserId(req.userId as string);

    return res.json(
      new ApiResponse(200, result, "User Post fetched successfully"),
    );
  },
);

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  console.log(postId);

  if (!postId) {
    throw new ApiError(404, "Post Id not found");
  }
  const result = await postService.updatePostById(
    req.body,
    req.userId as string,
    postId as string,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Post Updated successfully"));
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { userId } = req;

  if (!postId) {
    throw new ApiError(404, "Post Id not found");
  }
  if (!req.userId) {
    throw new ApiError(401, "Not authorized");
  }

  await postService.deletePost(postId as string, userId as string);

  return res
    .status(200)
    .json(new ApiResponse(200, "Post deleted successfully"));
});
