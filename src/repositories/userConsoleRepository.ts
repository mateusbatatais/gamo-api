import { Prisma } from "@prisma/client";
import { db } from "../lib/db";

export const createUserConsole = (data: Prisma.UserConsoleCreateInput) => {
  return db.userConsole.create({
    data,
    include: {
      console: true,
      variant: true,
      skin: true,
    },
  });
};

export const listUserConsoles = (userId: number) => {
  return db.userConsole.findMany({
    where: { userId },
    include: {
      console: true,
      variant: true,
      skin: true,
    },
  });
};
