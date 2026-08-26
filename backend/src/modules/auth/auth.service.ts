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
import { IAuthRepository } from "./auth.interface.js";
import { toUserResponse } from "./auth.mapper.js";
import {
  loginUserDTO,
  refreshTokenDTO,
  registerUserDTO,
} from "./auth.schema.js";

export class AuthService {
  constructor(private repo: IAuthRepository) {}

  async registerUserService(body: registerUserDTO) {
    const { username, email, password } = body;

    const existingUserByUsername = await this.repo.findUserByUsername(username);

    if (existingUserByUsername) {
      throw new ApiError(400, "User already exists");
    }

    const existingUserByEmail = await this.repo.findUserByEmail(email);

    if (existingUserByEmail) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.repo.createUser(email, username, hashedPassword);

    const accessToken = await generateAccessToken(newUser.id);
    const refreshToken = await generateRefreshToken(newUser.id);

    await this.repo.createRefreshToken({
      token: refreshToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //24 days
    });


    return {
      user: toUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  }

  async loginUserService(body: loginUserDTO) {
    const { email, password } = body;

    const user = await this.repo.findUserByEmail(email);

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

    await this.repo.createRefreshToken({
      token: hashedRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //24 days
    });


    return {
      user: toUserResponse(user),
      accessToken : newAccessToken,
      refreshToken : newRefreshToken,
    };
  }

  async refreshToken(body: refreshTokenDTO) {
    const { token } = body;
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

    const existingToken = await this.repo.findRefreshToken(hashedToken);
    if (!existingToken) {
      throw new ApiError(403, "Refresh token not found");
    }

    await this.repo.deleteRefreshTokenById(existingToken.id);

    const newAccessToken = await generateAccessToken(decoded.userId);
    const newRefreshToken = await generateRefreshToken(decoded.userId);

    const newRefreshTokenHashed = await hashRefreshToken(newRefreshToken);

    await this.repo.createRefreshToken({
      token: newRefreshTokenHashed,
      userId: decoded.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.repo.findUserById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return {
      user: toUserResponse(user),
    };
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new ApiError(401, "Refresh token not required");
    }

    const refreshTokenHashed = await hashRefreshToken(refreshToken);

    const existingToken = await this.repo.findRefreshToken(refreshTokenHashed);

    if (!existingToken) {
      throw new ApiError(404, "Invalid refresh token");
    }

    await this.repo.deleteRefreshTokenById(existingToken.id);

    return true;
  }

  async logoutAll(userId: string) {
    if (!userId) {
      throw new ApiError(401, "User not authentication");
    }

    await this.repo.deleteAllRefreshTokenByUser(userId);
    return true;
  }
}
