// src/services/userService.ts
import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/errors";
import { UpdateProfileInputDTO, UserProfileDTO, ChangePasswordInputDTO } from "../dtos/user.dto";

/**
 * Recupera dados públicos do usuário
 */
export async function getUserById(userId: number): Promise<UserProfileDTO> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
      role: true,
      profileImage: true,
    },
  });

  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Usuário não encontrado");
  }

  return user;
}

/**
 * Atualiza perfil do usuário
 */
export async function updateProfile(input: UpdateProfileInputDTO): Promise<UserProfileDTO> {
  const { userId, name, email, description, profileImage } = input;

  const existing = await db.user.findFirst({
    where: { email, NOT: { id: userId } },
  });
  if (existing) {
    throw new AppError(400, "EMAIL_IN_USE", "Esse e-mail já está em uso");
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: { name, email, description, profileImage },
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
      role: true,
      profileImage: true,
    },
  });

  return updatedUser;
}

/**
 * Altera senha do usuário
 */
export async function changePassword(input: ChangePasswordInputDTO): Promise<void> {
  const { userId, currentPassword, newPassword } = input;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  if (!user?.password) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Credenciais inválidas");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Senha atual incorreta");
  }

  const SALT_ROUNDS = 10;
  const newHashed = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await db.user.update({
    where: { id: userId },
    data: { password: newHashed },
  });
}
export type UpdateProfileInput = UpdateProfileInputDTO;
export type ChangePasswordInput = ChangePasswordInputDTO;
