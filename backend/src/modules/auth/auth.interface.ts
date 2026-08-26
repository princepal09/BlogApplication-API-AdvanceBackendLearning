export interface IAuthRepository {
  findUserByUsername(username: string): Promise<any>;
  findUserById(id: string): Promise<any>;
  findUserByEmail(email: string): Promise<any>;
  createUser(email: string, username: string, password: string): Promise<any>;
  createRefreshToken(data: {
    token: string;
    userId: string;
    expiresAt: Date;
  }): Promise<any>;
  findRefreshToken(token: string): Promise<any>;
  findRefreshTokenByUserId(userId: string): Promise<any>;

  deleteRefreshTokenById(id: string): Promise<any>;

  deleteRefreshTokenByToken(token: string): Promise<any>;
  deleteAllRefreshTokenByUser(userId: string): Promise<any>;
}


