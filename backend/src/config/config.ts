import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 9000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET as string
export const JWT_ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_TOKEN_EXPIRY as string
export const JWT_REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_TOKEN_EXPIRY as string



console.log(JWT_ACCESS_TOKEN_EXPIRY)
console.log(JWT_REFRESH_TOKEN_EXPIRY)
