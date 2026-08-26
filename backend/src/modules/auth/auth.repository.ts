import { prisma } from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository {
  async findUserById(id: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findUserByUsername(username: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }

  async findUserByEmail(email: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<any> {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    return user;
  }

  async createRefreshToken(data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }): Promise<any> {
    const refreshToken = await prisma.refreshToken.create({
      data,
    });
    return refreshToken;
  }

  async findRefreshToken(token: string): Promise<any> {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        token,
      },
    });
    return refreshToken;
  }

  async findRefreshTokenByUserId(userId: string): Promise<any> {
    return await prisma.refreshToken.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteRefreshTokenById(id: string): Promise<any> {
    return await prisma.refreshToken.delete({
      where: {
        id,
      },
    });
  }

  async deleteRefreshTokenByToken(token: string): Promise<any> {
    return prisma.refreshToken.delete({
      where: {
        token,
      },
    });
  }

  async deleteAllRefreshTokenByUser(userId: string): Promise<any> {
    return await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
