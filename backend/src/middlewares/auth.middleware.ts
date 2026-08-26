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
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unatuhorized Request");
    }

    const decoded = verifyAccessToken(token);
    console.log(decoded);

    const user = await authRepository.findUserById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "Unauthorized access");
    }

    req.userId = user.id;

    return next();
  } catch (err) {
    console.error("verifyUser error:", err);
    next(err);
  }
};
