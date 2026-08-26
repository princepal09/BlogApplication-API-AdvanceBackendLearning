import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { authRepository } from "../modules/auth/auth.repository.js";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unatuhorized Request");
    }

    const decoded = verifyAccessToken(token);

    const user = await authRepository.findUserById(decoded._id);

    if (!user) {
      throw new ApiError(401, "Unauthorized access");
    }

    req.userId = user.id;

    next();
  } catch (err) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
