import { db } from "../../core/db";
import { Prisma } from "@prisma/client";
import { UserConsoleResponse } from "./userConsole.schema";

const selectFields = {
  id: true,
  userId: true,
  consoleId: true,
  consoleVariantId: true,
  skinId: true,
  customSkin: true,
  description: true,
  status: true,
  price: true,
  hasBox: true,
  hasManual: true,
  condition: true,
  acceptsTrade: true,
  photoUrl: true,
  createdAt: true,
};

// Removido o userId do parâmetro pois agora está incluso nos dados
export const createUserConsole = async (
  data: Prisma.UserConsoleCreateInput,
): Promise<UserConsoleResponse> => {
  return db.userConsole.create({
    data,
    select: selectFields,
  });
};

export const getUserConsoleById = async (
  id: number,
  userId: number,
): Promise<UserConsoleResponse | null> => {
  return db.userConsole.findUnique({
    where: { id, userId },
    select: selectFields,
  });
};

// Removido o userId do parâmetro
export const updateUserConsole = async (
  id: number,
  data: Prisma.UserConsoleUpdateInput,
): Promise<UserConsoleResponse> => {
  return db.userConsole.update({
    where: { id },
    data,
    select: selectFields,
  });
};

// Removido o userId do parâmetro
export const deleteUserConsole = async (id: number): Promise<boolean> => {
  const result = await db.userConsole.delete({
    where: { id },
  });
  return !!result;
};

export const getUserConsoles = async (userId: number): Promise<UserConsoleResponse[]> => {
  return db.userConsole.findMany({
    where: { userId },
    select: selectFields,
    orderBy: { createdAt: "desc" },
  });
};
