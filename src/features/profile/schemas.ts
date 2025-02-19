import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1),
  // username: z.string().min(1),
});

export const updatePasswordSchema = z.object({
  newPassword: z.string().min(1),
  currentPassword: z.string().min(1),
});

export const updateEmailSchema = z.object({
  newEmail: z.string().email(),
  // currentPassword: z.string().min(1),
});
