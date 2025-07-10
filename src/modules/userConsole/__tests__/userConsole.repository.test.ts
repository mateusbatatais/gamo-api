// src/modules/userConsole/__tests__/userConsole.repository.test.ts
import { describe, expect, it, vi, beforeEach } from "vitest";
import { db } from "../../../core/db";
import {
  createUserConsole,
  getUserConsoleById,
  updateUserConsole,
  deleteUserConsole,
  getUserConsoles,
} from "../userConsole.repository";
import { UserConsoleResponse } from "../userConsole.schema";
import { ConsoleStatus, ItemCondition } from "@prisma/client";

// Mock completo do Prisma Client
vi.mock("../../../core/db", () => ({
  db: {
    userConsole: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

import type { Mock } from "vitest";

// Definir tipos para os mocks
type MockPrismaClient = {
  userConsole: {
    create: Mock;
    findUnique: Mock;
    update: Mock;
    delete: Mock;
    findMany: Mock;
  };
};

// Cast seguro para o mock
const dbMock = db as unknown as MockPrismaClient;

const mockUserConsole: UserConsoleResponse = {
  id: 1,
  userId: 1,
  consoleId: 1,
  consoleVariantId: 1,
  skinId: null,
  customSkin: null,
  description: "My custom console",
  status: ConsoleStatus.OWNED,
  price: 1500,
  hasBox: true,
  hasManual: true,
  condition: ItemCondition.USED,
  acceptsTrade: false,
  photoMain: "https://example.com/main.jpg",
  photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
  createdAt: new Date(),
};

describe("UserConsole Repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createUserConsole", () => {
    it("should create a user console", async () => {
      // Configurar mock
      dbMock.userConsole.create.mockResolvedValue(mockUserConsole);

      // Dados de entrada com tipos corretos
      const createData = {
        user: { connect: { id: 1 } },
        console: { connect: { id: 1 } },
        variant: { connect: { id: 1 } },
        status: ConsoleStatus.OWNED,
        hasBox: true,
        condition: ItemCondition.USED,
      };

      // Executar
      const result = await createUserConsole(createData);

      // Verificar
      expect(dbMock.userConsole.create).toHaveBeenCalledWith({
        data: createData,
        select: expect.anything(),
      });
      expect(result).toEqual(mockUserConsole);
    });
  });

  describe("getUserConsoleById", () => {
    it("should return a user console", async () => {
      dbMock.userConsole.findUnique.mockResolvedValue(mockUserConsole);

      const result = await getUserConsoleById(1, 1);

      expect(dbMock.userConsole.findUnique).toHaveBeenCalledWith({
        where: { id: 1, userId: 1 },
        select: expect.anything(),
      });
      expect(result).toEqual(mockUserConsole);
    });

    it("should return null if not found", async () => {
      dbMock.userConsole.findUnique.mockResolvedValue(null);

      const result = await getUserConsoleById(999, 1);

      expect(result).toBeNull();
    });
  });

  describe("updateUserConsole", () => {
    it("should update a user console", async () => {
      const updatedData = { ...mockUserConsole, description: "Updated description" };
      dbMock.userConsole.update.mockResolvedValue(updatedData);

      const updateData = {
        description: "Updated description",
        price: 1600,
      };

      const result = await updateUserConsole(1, updateData);

      expect(dbMock.userConsole.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
        select: expect.anything(),
      });
      expect(result).toEqual(updatedData);
    });
  });

  describe("deleteUserConsole", () => {
    it("should delete a user console", async () => {
      dbMock.userConsole.delete.mockResolvedValue(mockUserConsole);

      const result = await deleteUserConsole(1);

      expect(dbMock.userConsole.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toBe(true);
    });
  });

  describe("getUserConsoles", () => {
    it("should return user consoles", async () => {
      const consoles = [mockUserConsole];
      dbMock.userConsole.findMany.mockResolvedValue(consoles);

      const result = await getUserConsoles(1);

      expect(dbMock.userConsole.findMany).toHaveBeenCalledWith({
        where: { userId: 1 },
        select: expect.anything(),
        orderBy: { createdAt: "desc" },
      });
      expect(result).toEqual(consoles);
    });

    it("should return empty array if no consoles", async () => {
      dbMock.userConsole.findMany.mockResolvedValue([]);

      const result = await getUserConsoles(1);

      expect(result).toEqual([]);
    });
  });
});
