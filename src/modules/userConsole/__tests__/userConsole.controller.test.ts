import { describe, expect, it, vi, beforeEach } from "vitest";
import * as controller from "../userConsole.controller";
import * as service from "../userConsole.service";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors";
import type { UserConsoleResponse, UserConsoleInput } from "../userConsole.schema";
import { $Enums } from "@prisma/client";

vi.mock("../userConsole.service");

describe("UserConsole Controller", () => {
  const mockRequest = (body: unknown = {}, params: unknown = {}, user?: { id: number }) =>
    ({
      body,
      params,
      user,
    }) as Request;

  const mockResponse = () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    return res as unknown as Response;
  };

  const next: NextFunction = vi.fn();

  const userId = 1;
  const userConsoleId = 1;

  const mockUserConsole: UserConsoleResponse = {
    id: userConsoleId,
    userId,
    consoleId: 1,
    consoleVariantId: 1,
    skinId: null,
    customSkin: null,
    description: null,
    status: $Enums.ConsoleStatus.OWNED,
    price: null,
    hasBox: true,
    hasManual: null,
    condition: $Enums.ItemCondition.USED,
    acceptsTrade: null,
    photoUrl: null,
    createdAt: new Date(),
  };

  // Definindo input explicitamente
  const input: UserConsoleInput = {
    consoleId: 1,
    consoleVariantId: 1,
    status: "OWNED",
    condition: "USED",
    hasBox: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createUserConsole", () => {
    it("deve criar um novo userConsole e retornar 201", async () => {
      const req = mockRequest(input, {}, { id: userId });
      const res = mockResponse();

      vi.mocked(service.createUserConsole).mockResolvedValue(mockUserConsole);

      await controller.createUserConsole[1](req, res, next);

      expect(service.createUserConsole).toHaveBeenCalledWith(userId, input);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        code: "CONSOLE_ADDED",
        message: "Console added to your collection",
        userConsole: mockUserConsole,
      });
    });

    it("deve chamar next com erro se ocorrer uma exceção", async () => {
      const req = mockRequest(input, {}, { id: userId });
      const res = mockResponse();
      const error = new AppError(400, "TEST_ERROR", "Test error");

      vi.mocked(service.createUserConsole).mockRejectedValue(error);

      await controller.createUserConsole[1](req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("listUserConsoles", () => {
    it("deve retornar a lista de consoles do usuário", async () => {
      const req = mockRequest({}, {}, { id: userId });
      const res = mockResponse();
      const consoles = [mockUserConsole, mockUserConsole];

      vi.mocked(service.getUserConsoles).mockResolvedValue(consoles);

      await controller.listUserConsoles(req, res, next);

      expect(service.getUserConsoles).toHaveBeenCalledWith(userId);
      expect(res.json).toHaveBeenCalledWith(consoles);
    });

    it("deve chamar next com erro se ocorrer uma exceção", async () => {
      const req = mockRequest({}, {}, { id: userId });
      const res = mockResponse();
      const error = new AppError(404, "TEST_ERROR", "Test error");

      vi.mocked(service.getUserConsoles).mockRejectedValue(error);

      await controller.listUserConsoles(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getUserConsole", () => {
    it("deve retornar um userConsole específico", async () => {
      const req = mockRequest({}, { id: userConsoleId.toString() }, { id: userId });
      const res = mockResponse();

      vi.mocked(service.getUserConsoleById).mockResolvedValue(mockUserConsole);

      await controller.getUserConsole(req, res, next);

      expect(service.getUserConsoleById).toHaveBeenCalledWith(userConsoleId, userId);
      expect(res.json).toHaveBeenCalledWith(mockUserConsole);
    });

    it("deve chamar next com erro se o userConsole não for encontrado", async () => {
      const req = mockRequest({}, { id: userConsoleId.toString() }, { id: userId });
      const res = mockResponse();
      const error = new AppError(404, "NOT_FOUND", "Console collection item not found");

      vi.mocked(service.getUserConsoleById).mockRejectedValue(error);

      await controller.getUserConsole(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("updateUserConsole", () => {
    it("deve atualizar um userConsole existente", async () => {
      const req = mockRequest(input, { id: userConsoleId.toString() }, { id: userId });
      const res = mockResponse();

      vi.mocked(service.updateUserConsole).mockResolvedValue(mockUserConsole);

      await controller.updateUserConsole[1](req, res, next);

      expect(service.updateUserConsole).toHaveBeenCalledWith(userConsoleId, userId, input);
      expect(res.json).toHaveBeenCalledWith({
        code: "CONSOLE_UPDATED",
        message: "Console collection item updated",
        userConsole: mockUserConsole,
      });
    });

    it("deve chamar next com erro se ocorrer uma exceção", async () => {
      const req = mockRequest(input, { id: userConsoleId.toString() }, { id: userId });
      const res = mockResponse();
      const error = new AppError(400, "TEST_ERROR", "Test error");

      vi.mocked(service.updateUserConsole).mockRejectedValue(error);

      await controller.updateUserConsole[1](req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("deleteUserConsole", () => {
    it("deve deletar um userConsole existente", async () => {
      const req = mockRequest({}, { id: userConsoleId.toString() }, { id: userId });
      const res = mockResponse();

      vi.mocked(service.deleteUserConsole).mockResolvedValue(true);

      await controller.deleteUserConsole(req, res, next);

      expect(service.deleteUserConsole).toHaveBeenCalledWith(userConsoleId, userId);
      expect(res.json).toHaveBeenCalledWith({
        code: "CONSOLE_REMOVED",
        message: "Console removed from your collection",
      });
    });

    it("deve chamar next com erro se ocorrer uma exceção", async () => {
      const req = mockRequest({}, { id: userConsoleId.toString() }, { id: userId });
      const res = mockResponse();
      const error = new AppError(400, "TEST_ERROR", "Test error");

      vi.mocked(service.deleteUserConsole).mockRejectedValue(error);

      await controller.deleteUserConsole(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
