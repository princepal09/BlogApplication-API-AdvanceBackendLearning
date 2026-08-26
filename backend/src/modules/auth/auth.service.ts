import { IJWTPayload } from "../../types/index.js";
import ApiError from "../../utils/ApiError.js";
import {
  comparePassword,
  hashPassword,
  hashRefreshToken,
} from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.helper.js";
import { toUserResponse } from "./auth.mapper.js";
import { authRepository } from "./auth.repository.js";
import { loginUserDTO, refreshTokenDTO, registerUserDTO } from "./auth.schema.js";

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

  loginUserService: async (body: loginUserDTO) => {
    const { email, password } = body;

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(409, "User not found, register first");
    }

    const isPassValid = await comparePassword(password, user.password);

    if (!isPassValid) {
      throw new ApiError(401, "Invalid Credentials");
    }

    const userId = user.id as string;

    const newAccessToken = await generateAccessToken(userId);
    const newRefreshToken = await generateRefreshToken(userId);

    const hashedRefreshToken = await hashRefreshToken(newRefreshToken);

    await authRepository.createRefreshToken({
      token: hashedRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //24 days
    });

    return {
      user: toUserResponse(user),
      newAccessToken,
      newRefreshToken,
    };
  },

  refreshToken: async (body: refreshTokenDTO) => {
    const {token} = body;
    if (!token) {
      throw new ApiError(401, "Refresh Token Required");
    }

    let decoded;

    try {
      decoded = verifyRefreshToken(token) as IJWTPayload;
    } catch (err) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const hashedToken = await hashRefreshToken(token);

    const existingToken = await authRepository.findRefreshToken(hashedToken);
    if (!existingToken) {
      throw new ApiError(403, "Refresh token not found");
    }

    await authRepository.deleteRefreshTokenById(existingToken.id);

    const newAccessToken = await generateAccessToken(decoded.userId);
    const newRefreshToken = await generateRefreshToken(decoded.userId);

    const newRefreshTokenHashed =await hashRefreshToken(newRefreshToken);

    await authRepository.createRefreshToken({
      token: newRefreshTokenHashed,
      userId: decoded.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },


  getCurrentUser : async(userId : string) => {
    const user = await authRepository.findUserById(userId);

    if(!user){
      throw new ApiError(404, "User not found")
    }
    return {
      user : toUserResponse(user)
    }

  }
};
