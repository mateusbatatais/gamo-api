// src/validators/userValidator.ts
import { z } from "zod";

export const createUserProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  description: z.string().nullable().optional(),
  profileImage: z.string().url().optional(),
});

export const createChangePasswordSchema = z.object({
  currentPassword: z.string().min(6, "A senha atual deve ter pelo menos 6 caracteres"),
  newPassword: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres"),
  confirmNewPassword: z
    .string()
    .min(6, "A confirmação de nova senha deve ter pelo menos 6 caracteres"),
});
