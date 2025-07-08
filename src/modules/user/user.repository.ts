// src/modules/user/user.repository.ts
import { Prisma } from "@prisma/client";
import { UserProfile } from "./user.schema";
import { db } from "../../core/db";

export const getUserById = async (userId: number): Promise<UserProfile> => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      slug: true, // Adicionar slug
      email: true,
      description: true,
      role: true,
      profileImage: true,
    },
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const getUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
    select: {
      id: true,
      password: true,
      emailVerified: true,
    },
  });
};

export const getUserBySlug = async (slug: string) => {
  return db.user.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      description: true,
      role: true,
      profileImage: true,
    },
  });
};

export const checkSlugAvailability = async (slug: string, userId?: number) => {
  return db.user.findFirst({
    where: {
      slug,
      ...(userId ? { id: { not: userId } } : {}),
    },
  });
};

export const updateUser = async (userId: number, data: Prisma.UserUpdateInput) => {
  return db.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      slug: true, // Incluir slug na resposta
      email: true,
      description: true,
      role: true,
      profileImage: true,
    },
  });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return db.user.create({
    data,
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
    },
  });
};

export const getUserWithPasswordById = async (userId: number) => {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      password: true,
    },
  });
};

export const userHasPassword = async (userId: number): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });
  return !!user?.password;
};
