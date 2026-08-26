import jwt, { SignOptions } from "jsonwebtoken";

import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_SECRET,
} from "../config/config.js";
import { AccessTokenPayload } from "../types/index.js";
import ApiError from "./ApiError.js";

const ACCESS_TOKEN_SECRET = JWT_ACCESS_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRY =
  JWT_ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];

const REFRESH_TOKEN_SECRET = JWT_REFRESH_TOKEN_SECRET;

const REFRESH_TOKEN_EXPIRY =
  JWT_REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];

export const generateAccessToken = (userId: string) => {
  console.log("ACCESS_TOKEN_EXPIRY:", ACCESS_TOKEN_EXPIRY);
  console.log("TYPE:", typeof ACCESS_TOKEN_EXPIRY);
  console.log(
    "RAW VALUE:",
    JSON.stringify(ACCESS_TOKEN_EXPIRY)
  );

  return jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(
    token,
   JWT_REFRESH_TOKEN_SECRET
  );
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  try {
    const decoded = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET as string
    ) as AccessTokenPayload;


    return decoded;
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
};