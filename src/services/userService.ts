// src/services/userService.ts

import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/errors";

export interface UpdateProfileInput {
  userId: number;
  name: string;
  email: string;
  description?: string | null;
  profileImage?: string; // ← incluído
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
      profileImage: true,
    },
  });

  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Usuário não encontrado");
  }

  return user;
}

export async function updateProfile(input: UpdateProfileInput) {
  console.log("🔧 [userService.updateProfile] input:", input);

  const { userId, name, email, description, profileImage } = input;

  // checa e-mail duplicado se mudou
  const existing = await db.user.findFirst({
    where: { email, NOT: { id: userId } },
  });
  if (existing) {
    throw new AppError(400, "EMAIL_IN_USE", "Esse e-mail já está em uso");
  }

  // monta apenas os campos a atualizar
  const dataToUpdate: Record<string, unknown> = {};
  dataToUpdate.name = name;
  dataToUpdate.email = email;
  if (description !== undefined) dataToUpdate.description = description;
  if (profileImage !== undefined) dataToUpdate.profileImage = profileImage;

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: dataToUpdate,
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
      role: true,
      profileImage: true, // <-- importante retornar
    },
  });

  console.log("🔧 [userService.updateProfile] result:", updatedUser);
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
