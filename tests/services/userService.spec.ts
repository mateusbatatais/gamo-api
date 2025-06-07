// tests/services/userService.spec.ts
import { db } from "../../src/lib/db";
import bcrypt from "bcryptjs";
import {
  getUserById,
  updateProfile,
  changePassword,
  UpdateProfileInput,
  ChangePasswordInput,
} from "../../src/services/userService";

jest.mock("../../src/lib/db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe("userService", () => {
  const userId = 123;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getUserById", () => {
    it("retorna usuário quando encontrado", async () => {
      const mockUser = {
        id: userId,
        name: "Alice",
        email: "alice@example.com",
        description: "Bio",
        role: "NORMAL",
      };
      (db.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserById(userId);
      expect(result).toEqual(mockUser);
      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { id: true, name: true, email: true, description: true, role: true },
      });
    });

    it("lança AppError 404 quando não encontra", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(getUserById(userId)).rejects.toMatchObject({
        statusCode: 404,
        code: "USER_NOT_FOUND",
      });
    });
  });

  describe("updateProfile", () => {
    const input: UpdateProfileInput = {
      userId,
      name: "Bob",
      email: "bob@example.com",
      description: "New bio",
    };

    it("atualiza com sucesso quando e-mail livre", async () => {
      (db.user.findFirst as jest.Mock).mockResolvedValue(null);
      const updated = {
        id: userId,
        name: input.name,
        email: input.email,
        description: input.description,
        role: "NORMAL",
      };
      (db.user.update as jest.Mock).mockResolvedValue(updated);

      const result = await updateProfile(input);
      expect(result).toEqual(updated);
      expect(db.user.findFirst).toHaveBeenCalledWith({
        where: { email: input.email, NOT: { id: userId } },
      });
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { name: input.name, email: input.email, description: input.description },
        select: { id: true, name: true, email: true, description: true, role: true },
      });
    });

    it("lança AppError 400 quando e-mail já em uso", async () => {
      (db.user.findFirst as jest.Mock).mockResolvedValue({ id: 999, email: input.email });
      await expect(updateProfile(input)).rejects.toMatchObject({
        statusCode: 400,
        code: "EMAIL_IN_USE",
      });
    });
  });

  describe("changePassword", () => {
    const inputs: ChangePasswordInput = {
      userId,
      currentPassword: "oldpass",
      newPassword: "newpass",
    };

    it("lança INVALID_CREDENTIALS se usuário não encontrado ou sem senha", async () => {
      // sem usuário
      (db.user.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(changePassword(inputs)).rejects.toMatchObject({ code: "INVALID_CREDENTIALS" });

      // usuário sem password
      (db.user.findUnique as jest.Mock).mockResolvedValue({ password: null });
      await expect(changePassword(inputs)).rejects.toMatchObject({ code: "INVALID_CREDENTIALS" });
    });

    it("lança INVALID_CREDENTIALS se senha atual estiver incorreta", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue({ password: "hashed" });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(changePassword(inputs)).rejects.toMatchObject({
        statusCode: 401,
        code: "INVALID_CREDENTIALS",
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("oldpass", "hashed");
    });

    it("atualiza senha quando credenciais válidas", async () => {
      (db.user.findUnique as jest.Mock).mockResolvedValue({ password: "old-hash" });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue("new-hash");
      (db.user.update as jest.Mock).mockResolvedValue(undefined);

      await expect(changePassword(inputs)).resolves.toBeUndefined();
      expect(bcrypt.compare).toHaveBeenCalledWith("oldpass", "old-hash");
      expect(bcrypt.hash).toHaveBeenCalledWith("newpass", 10);
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { password: "new-hash" },
      });
    });
  });
});
