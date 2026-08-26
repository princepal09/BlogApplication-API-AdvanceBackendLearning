import { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { authService } from "./auth.service.js";
import ApiError from "../../utils/ApiError.js";
import { authRepository } from "./auth.repository.js";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.registerUserService(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Account created successfully"));
  },
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body) {
      throw new ApiError(400, "Bad Request");
    }

    const result = await authService.loginUserService(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Account created successfully"));
  },
);

export const refreshTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authRepository.createRefreshToken(req.body);

    return res
      .status(202)
      .json(new ApiResponse(202, result, "Token Craeated Successfully"));
  },
);

export const currentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await authService.getCurrentUser(req?.userId as string);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "User detailed fetch successfully"));
  },
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    await authService.logout(refreshToken);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "User Logged out successfully"));
  },
);

export const logoutAllController = asyncHandler(
  async (req: Request, res: Response) => {
     await authService.logoutAll(req.userId as string);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Logged out of all devices"));
  },
);
