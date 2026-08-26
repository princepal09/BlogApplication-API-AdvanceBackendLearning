import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";

export const verifyUser = (authService: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw new ApiError(401, "Unauthorized Request");
      }

      const decoded = verifyAccessToken(token);

      const user = await authService.getCurrentUser(decoded.userId);

      if (!user) {
        throw new ApiError(401, "Unauthorized access");
      }

      req.userId = user.user.id;

      next();
    } catch (err) {
      console.error("verifyUser error:", err);
      next(err);
    }
  };
};
