import { Prisma } from "@prisma/client";
import { db } from "../../core/db";

export const findUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      profileImage: true,
      role: true,
      password: true,
      emailVerified: true,
      emailVerificationToken: true,
      emailVerificationTokenExpires: true,
      passwordResetToken: true,
      passwordResetTokenExpires: true,
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
      profileImage: true,
      role: true,
    },
  });
};

export const updateUserByEmail = async (email: string, data: Prisma.UserUpdateInput) => {
  return db.user.update({
    where: { email },
    data,
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      profileImage: true,
      role: true,
    },
  });
};

export const findUserByVerificationToken = async (token: string) => {
  return db.user.findFirst({
    where: {
      emailVerificationToken: token,
      emailVerificationTokenExpires: { gt: new Date() },
    },
  });
};

export const findUserByPasswordResetToken = async (token: string) => {
  return db.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetTokenExpires: { gt: new Date() },
    },
  });
};

export const upsertUserByEmail = async (email: string, data: Prisma.UserCreateInput) => {
  return db.user.upsert({
    where: { email },
    update: {},
    create: data,
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      profileImage: true,
      role: true,
      password: true,
    },
  });
};

export const updateUserById = async (userId: number, data: Prisma.UserUpdateInput) => {
  return db.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      profileImage: true,
      role: true,
    },
  });
};

export const userHasPassword = async (userId: number) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });
  return !!user?.password;
};

export const getUserProfileForToken = async (userId: number) => {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      profileImage: true,
      role: true,
      password: true,
    },
  });
};
