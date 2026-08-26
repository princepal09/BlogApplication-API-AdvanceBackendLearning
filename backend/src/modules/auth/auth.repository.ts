import { prisma } from "../../lib/prisma.js";

export const authRepository = {
  findUserByUsername: async (username: string) => {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  },
  findUserById: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  },
  findUserByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  },

  createUser: async (email: string, username: string, password: string) => {
    const createdUser = await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    return createdUser;
  },

  createRefreshToken: async (data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }) => {
    const refreshToken = await prisma.refreshToken.create({
      data,
    });

    return refreshToken;
  },

  findRefreshToken: async (token: string) => {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        token,
      },
    });
    return refreshToken;
  },

  deleteRefreshTokenById: async (id: string) => {
    return await prisma.refreshToken.delete({
      where: {
        id,
      },
    });
  },
};
