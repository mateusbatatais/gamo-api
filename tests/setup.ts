import { mockDeep } from "jest-mock-extended";
import { resetPrismaMocks } from "./lib/prisma-mock";

// Mock global do Prisma
jest.mock("../src/lib/db", () => ({
  __esModule: true,
  default: mockDeep(),
}));

// Configurações adicionais de teste
beforeEach(() => {
  resetPrismaMocks();
});
