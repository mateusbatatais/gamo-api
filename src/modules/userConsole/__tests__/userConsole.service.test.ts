import { describe, expect, it, vi, beforeEach } from "vitest";
import * as service from "../userConsole.service";
import * as repository from "../userConsole.repository";
import { db } from "../../../core/db";
import { AppError } from "../../../shared/errors";
import { $Enums } from "@prisma/client";
import type { UserConsoleInput } from "../userConsole.schema";

// Mock completo para o db com todos os campos necessários
vi.mock("../../../core/db", () => ({
  db: {
    console: {
      findUnique: vi.fn(),
    },
    consoleVariant: {
      findUnique: vi.fn(),
    },
    skin: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("../userConsole.repository", () => ({
  createUserConsole: vi.fn(),
  updateUserConsole: vi.fn(),
  deleteUserConsole: vi.fn(),
  getUserConsoleById: vi.fn(),
  getUserConsoles: vi.fn(),
}));

describe("UserConsole Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const userId = 1;
  const consoleId = 1;
  const consoleVariantId = 1;
  const skinId = 1;
  const userConsoleId = 1;

  const input: UserConsoleInput = {
    consoleId,
    consoleVariantId,
    skinId,
    customSkin: "Custom",
    description: "Description",
    status: "OWNED",
    price: 1000,
    hasBox: true,
    hasManual: true,
    condition: "USED",
    acceptsTrade: true,
    photoUrl: "http://example.com/photo.jpg",
  };

  // Objeto completo com todas as propriedades necessárias
  const mockConsole = {
    id: consoleId,
    brandId: 1,
    slug: "playstation-5",
    nickname: "PS5",
    releaseDate: new Date(),
    generation: 5,
    type: "HOME",
  };

  const mockVariant = {
    id: consoleVariantId,
    consoleId: consoleId,
    slug: "slim",
    launchDate: new Date(),
    storage: "1TB",
    imageUrl: "http://example.com/image.jpg",
  };

  const mockSkin = {
    id: skinId,
    consoleVariantId: consoleVariantId,
    slug: "black",
    releaseDate: new Date(),
    limitedEdition: false,
    editionName: null,
    material: "Plastic",
    finish: "Matte",
    imageUrl: "http://example.com/skin.jpg",
  };

  const mockUserConsole = {
    id: userConsoleId,
    userId,
    consoleId,
    consoleVariantId,
    skinId,
    customSkin: "Custom",
    description: "Description",
    status: "OWNED" as $Enums.ConsoleStatus,
    price: 1000,
    hasBox: true,
    hasManual: true,
    condition: "USED" as $Enums.ItemCondition,
    acceptsTrade: true,
    photoUrl: "http://example.com/photo.jpg",
    createdAt: new Date(),
  };

  describe("createUserConsole", () => {
    it("deve criar um novo userConsole com sucesso", async () => {
      vi.mocked(db.console.findUnique).mockResolvedValue(mockConsole);
      vi.mocked(db.consoleVariant.findUnique).mockResolvedValue(mockVariant);
      vi.mocked(db.skin.findUnique).mockResolvedValue(mockSkin);
      vi.mocked(repository.createUserConsole).mockResolvedValue(mockUserConsole);

      const result = await service.createUserConsole(userId, input);

      expect(result).toEqual(mockUserConsole);
      expect(repository.createUserConsole).toHaveBeenCalledWith({
        user: { connect: { id: userId } },
        console: { connect: { id: consoleId } },
        variant: { connect: { id: consoleVariantId } },
        skin: { connect: { id: skinId } },
        customSkin: input.customSkin,
        description: input.description,
        status: input.status as $Enums.ConsoleStatus,
        price: input.price,
        hasBox: input.hasBox,
        hasManual: input.hasManual,
        condition: input.condition as $Enums.ItemCondition,
        acceptsTrade: input.acceptsTrade,
        photoUrl: input.photoUrl,
      });
    });

    it("deve lançar erro se o console não for encontrado", async () => {
      vi.mocked(db.console.findUnique).mockResolvedValue(null);

      await expect(service.createUserConsole(userId, input)).rejects.toThrow(
        new AppError(404, "CONSOLE_NOT_FOUND", "Console not found"),
      );
    });

    it("deve lançar erro se a variante do console não for encontrada", async () => {
      vi.mocked(db.console.findUnique).mockResolvedValue(mockConsole);
      vi.mocked(db.consoleVariant.findUnique).mockResolvedValue(null);

      await expect(service.createUserConsole(userId, input)).rejects.toThrow(
        new AppError(404, "VARIANT_NOT_FOUND", "Variant not found"),
      );
    });

    it("deve lançar erro se a skin não for encontrada", async () => {
      vi.mocked(db.console.findUnique).mockResolvedValue(mockConsole);
      vi.mocked(db.consoleVariant.findUnique).mockResolvedValue(mockVariant);
      vi.mocked(db.skin.findUnique).mockResolvedValue(null);

      await expect(service.createUserConsole(userId, input)).rejects.toThrow(
        new AppError(404, "SKIN_NOT_FOUND", "Skin not found"),
      );
    });

    it("deve criar sem skin se skinId não for fornecido", async () => {
      const inputWithoutSkin = { ...input, skinId: undefined };

      vi.mocked(db.console.findUnique).mockResolvedValue(mockConsole);
      vi.mocked(db.consoleVariant.findUnique).mockResolvedValue(mockVariant);
      vi.mocked(repository.createUserConsole).mockResolvedValue(mockUserConsole);

      await service.createUserConsole(userId, inputWithoutSkin);

      expect(repository.createUserConsole).toHaveBeenCalledWith(
        expect.objectContaining({
          skin: undefined,
        }),
      );
    });
  });

  describe("updateUserConsole", () => {
    it("deve atualizar um userConsole existente", async () => {
      vi.mocked(repository.getUserConsoleById).mockResolvedValue(mockUserConsole);
      vi.mocked(db.skin.findUnique).mockResolvedValue(mockSkin);
      vi.mocked(repository.updateUserConsole).mockResolvedValue(mockUserConsole);

      const result = await service.updateUserConsole(userConsoleId, userId, input);

      expect(result).toEqual(mockUserConsole);
      expect(repository.getUserConsoleById).toHaveBeenCalledWith(userConsoleId, userId);
    });

    it("deve lançar erro se o userConsole não for encontrado", async () => {
      vi.mocked(repository.getUserConsoleById).mockResolvedValue(null);

      await expect(service.updateUserConsole(userConsoleId, userId, input)).rejects.toThrow(
        new AppError(404, "NOT_FOUND", "Console collection item not found"),
      );
    });
  });

  describe("deleteUserConsole", () => {
    it("deve deletar um userConsole existente", async () => {
      vi.mocked(repository.getUserConsoleById).mockResolvedValue(mockUserConsole);
      vi.mocked(repository.deleteUserConsole).mockResolvedValue(true);

      const result = await service.deleteUserConsole(userConsoleId, userId);

      expect(result).toBe(true);
    });

    it("deve lançar erro se o userConsole não for encontrado", async () => {
      vi.mocked(repository.getUserConsoleById).mockResolvedValue(null);

      await expect(service.deleteUserConsole(userConsoleId, userId)).rejects.toThrow(
        new AppError(404, "NOT_FOUND", "Console collection item not found"),
      );
    });
  });

  describe("getUserConsoleById", () => {
    it("deve retornar um userConsole existente", async () => {
      vi.mocked(repository.getUserConsoleById).mockResolvedValue(mockUserConsole);

      const result = await service.getUserConsoleById(userConsoleId, userId);

      expect(result).toEqual(mockUserConsole);
    });

    it("deve lançar erro se o userConsole não for encontrado", async () => {
      vi.mocked(repository.getUserConsoleById).mockResolvedValue(null);

      await expect(service.getUserConsoleById(userConsoleId, userId)).rejects.toThrow(
        new AppError(404, "NOT_FOUND", "Console collection item not found"),
      );
    });
  });

  describe("getUserConsoles", () => {
    it("deve retornar a lista de consoles do usuário", async () => {
      const consoles = [mockUserConsole, mockUserConsole];
      vi.mocked(repository.getUserConsoles).mockResolvedValue(consoles);

      const result = await service.getUserConsoles(userId);

      expect(result).toEqual(consoles);
      expect(repository.getUserConsoles).toHaveBeenCalledWith(userId);
    });
  });
});
