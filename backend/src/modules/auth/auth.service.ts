import ApiError from "../../utils/ApiError.js";
import { hashPassword } from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.helper.js";
import { toUserResponse } from "./auth.mapper.js";
import { authRepository } from "./auth.repository.js";
import { registerUserDTO } from "./auth.schema.js";

export const authService = {
  registerUserService: async (body: registerUserDTO) => {
    const { username, email, password } = body;

    const existingUserByUsername =
      await authRepository.findUserByUsername(username);

    if (existingUserByUsername) {
      throw new ApiError(400, "User already exists");
    }

    const existingUserByEmail = await authRepository.findUserByEmail(email);

    if (existingUserByEmail) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await authRepository.createUser(
      email,
      username,
      hashedPassword,
    );

    const accessToken = await generateAccessToken(newUser.id);
    const refreshToken = await generateRefreshToken(newUser.id);

    await authRepository.createRefreshToken({
      token: refreshToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //24 days
    });

    return {
      user: toUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  },
};
