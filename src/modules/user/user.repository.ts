import { Prisma } from "@prisma/client";
import { UserProfile } from "./user.schema";
import { db } from "../../core/db";

export const getUserById = async (userId: number): Promise<UserProfile> => {
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

export const updateUser = async (userId: number, data: Prisma.UserUpdateInput) => {
  return db.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
      role: true,
      profileImage: true,
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
