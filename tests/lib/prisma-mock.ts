import { mockDeep } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

const prismaMock = mockDeep<PrismaClient>();

export const db = prismaMock;

// Função para resetar todos os mocks antes de cada teste
export const resetPrismaMocks = () => {
  Object.keys(prismaMock).forEach((key) => {
    if (typeof prismaMock[key as keyof PrismaClient] === "object") {
      Object.keys(prismaMock[key as keyof PrismaClient]).forEach((subKey) => {
        if (jest.isMockFunction(prismaMock[key as keyof PrismaClient][subKey as string])) {
          prismaMock[key as keyof PrismaClient][subKey as string].mockReset();
        }
      });
    }
  });
};
