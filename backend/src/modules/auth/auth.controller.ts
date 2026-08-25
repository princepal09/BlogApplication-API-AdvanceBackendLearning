import { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { authService } from "./auth.service.js";
import ApiError from "../../utils/ApiError.js";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    
    const result = await authService.registerUserService(req.body);

    return res.status(200).json(
      new ApiResponse(200, result, "Account created successfully")
    )
  },
);


export const loginUserController = asyncHandler(
  async (req:Request, res:Response) => {
    if(!req.body){
      throw new ApiError(400, "Bad Request")
    }

    const result = await authService.loginUserService(req.body);

     return res.status(200).json(
      new ApiResponse(200, result, "Account created successfully")
    )
    
  }
)