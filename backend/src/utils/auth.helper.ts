import bcrypt from "bcrypt";
import crypto from "crypto";

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
