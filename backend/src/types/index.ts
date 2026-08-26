export interface IUserResponse {
  id: string;
  username: string;
  email: string;
  createdAt : Date
  updatedAt : Date
}

export interface IJWTPayload {
  userId : string
}

export interface AccessTokenPayload {
  _id: string;
  email?: string;
}