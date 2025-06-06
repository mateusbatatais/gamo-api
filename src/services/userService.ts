// src/services/userService.ts

import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/errors";

export interface UpdateProfileInput {
  userId: number;
  name: string;
  email: string;
  description?: string | null;
}

export interface ChangePasswordInput {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

export async function getUserById(userId: number) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
      role: true,
    },
  });

  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Usuário não encontrado");
  }

  return user;
}

export async function updateProfile(input: UpdateProfileInput) {
  const { userId, name, email, description } = input;

  // Verifica se existe outro usuário com o mesmo e-mail
  const existing = await db.user.findFirst({
    where: {
      email,
      NOT: { id: userId },
    },
  });
  if (existing) {
    throw new AppError(400, "EMAIL_IN_USE", "Esse e-mail já está em uso");
  }

  // Atualiza o usuário
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      description: description ?? null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
      role: true,
    },
  });

  return updatedUser;
}

export async function changePassword(input: ChangePasswordInput) {
  const { userId, currentPassword, newPassword } = input;

  // Busca o hash atual no banco
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  if (!user || !user.password) {
    // Se o usuário não tiver senha (ex.: login social) ou não existir,
    // considera inválido.
    throw new AppError(401, "INVALID_CREDENTIALS", "Credenciais inválidas");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Senha atual incorreta");
  }

  // Gera hash da nova senha
  const SALT_ROUNDS = 10;
  const newHashed = await bcrypt.hash(newPassword, SALT_ROUNDS);

  // Atualiza no banco
  await db.user.update({
    where: { id: userId },
    data: { password: newHashed },
  });

  return;
}
