import { Prisma } from "@prisma/client";
import { db } from "../../core/db";

export const findUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return db.user.create({
    data,
  });
};

export const updateUserByEmail = async (email: string, data: Prisma.UserUpdateInput) => {
  return db.user.update({
    where: { email },
    data,
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
  });
};

export const updateUserById = async (userId: number, data: Prisma.UserUpdateInput) => {
  return db.user.update({
    where: { id: userId },
    data,
  });
};
