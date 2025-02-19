import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignupSchemaType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SigninSchemaType = z.infer<typeof signinSchema>;

export const forgetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});
export type forgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
