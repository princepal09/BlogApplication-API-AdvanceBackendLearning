import bcrypt from "bcrypt";
import crypto from "crypto";
import { Response } from "express";
import { NODE_ENV } from "../config/config.js";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPasswordInDb: string,
) => {
  return await bcrypt.compare(password, hashedPasswordInDb);
};

export const hashRefreshToken = async (refreshToken: string) => {
  return crypto.createHash("sha256").update(refreshToken).digest("hex");
};

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const destroyCookie = (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
