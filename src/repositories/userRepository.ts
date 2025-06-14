// src/repositories/userRepository.ts
import { db } from "../core/db";
import { Prisma } from "@prisma/client";

// Função para encontrar um usuário pelo ID
export const getUserById = (userId: number) => {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
      role: true,
      profileImage: true,
      password: true, // Incluindo a senha aqui
    },
  });
};

// Função para criar um novo usuário
export const createUser = (data: Prisma.UserCreateInput) => {
  return db.user.create({
    data,
  });
};

// Função para atualizar o perfil de um usuário
export const updateUser = (userId: number, data: Prisma.UserUpdateInput) => {
  return db.user.update({
    where: { id: userId },
    data,
  });
};

// Função para encontrar um usuário com base no e-mail
export const getUserByEmail = (email: string) => {
  return db.user.findFirst({
    where: { email },
  });
};
