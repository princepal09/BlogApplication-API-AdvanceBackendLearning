import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(3, "Username must be at least characters long"),
  email: z.email("Email is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

export const loginUserSchema = z.object({
  email : z.email("Email is required"),
  password : z.string()
})

export type loginUserDTO = z.infer<typeof registerUserSchema>;
export type registerUserDTO = z.infer<typeof registerUserSchema>;


