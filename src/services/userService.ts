// src/services/userService.ts
import * as userRepository from "../repositories/userRepository";
import bcrypt from "bcryptjs";
import { AppError } from "../shared/errors";
import { UpdateProfileInputDTO, UserProfileDTO, ChangePasswordInputDTO } from "../dtos/user.dto";

/**
 * Recupera dados públicos do usuário
 */
export async function getUserById(userId: number): Promise<UserProfileDTO> {
  const user = await userRepository.getUserById(userId); // Chamando o repositório
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

  // Verifica se o e-mail já está em uso
  const existing = await userRepository.getUserByEmail(email);
  if (existing && existing.id !== userId) {
    throw new AppError(400, "EMAIL_IN_USE", "Esse e-mail já está em uso");
  }

  const updatedUser = await userRepository.updateUser(userId, {
    name,
    email,
    description,
    profileImage,
  });
  return updatedUser;
}

/**
 * Altera senha do usuário
 */
export async function changePassword(input: ChangePasswordInputDTO): Promise<void> {
  const { userId, currentPassword, newPassword } = input;

  const user = await userRepository.getUserById(userId); // Chamando o repositório para buscar o usuário
  if (!user?.password) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Credenciais inválidas");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Senha atual incorreta");
  }

  const SALT_ROUNDS = 10;
  const newHashed = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await userRepository.updateUser(userId, { password: newHashed });
}

export type UpdateProfileInput = UpdateProfileInputDTO;
export type ChangePasswordInput = ChangePasswordInputDTO;
