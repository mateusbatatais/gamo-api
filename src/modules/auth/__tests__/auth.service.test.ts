import { describe, expect, it, vi, beforeEach, Mock } from "vitest"; // Importe Mock
import * as authService from "../auth.service";
import { db } from "../../../core/db";
import { AppError } from "../../../shared/errors";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

// Mock do db corretamente
vi.mock("../../../core/db", () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// Mock do bcrypt corrigido com exportação padrão
vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(),
  },
  hash: vi.fn(),
}));

vi.mock("jsonwebtoken");

const mockUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  profileImage: null,
  password: "hashed_password",
  description: null,
  role: Role.NORMAL,
  emailVerified: false,
  emailVerificationToken: null,
  emailVerificationTokenExpires: null,
  passwordResetToken: null,
  passwordResetTokenExpires: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset dos mocks específicos
    vi.mocked(db.user.findUnique).mockReset();
    vi.mocked(db.user.create).mockReset();

    // Correção usando Mock importado
    (bcrypt.hash as Mock).mockReset();
  });

  describe("signup", () => {
    it("should create a new user with hashed password", async () => {
      // Setup
      const input = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      // Configurar mocks
      vi.mocked(db.user.findUnique).mockResolvedValue(null);
      (bcrypt.hash as Mock).mockResolvedValue("hashed_password"); // Correção aqui
      vi.mocked(db.user.create).mockResolvedValue(mockUser);

      // Execute
      const result = await authService.signup(input);

      // Verify
      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { email: input.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
      expect(result.userId).toBe(1);
    });

    it("should throw error if email already exists", async () => {
      // Setup
      const input = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      // Configurar mock para retornar usuário existente
      vi.mocked(db.user.findUnique).mockResolvedValue(mockUser);

      // Execute & Verify
      await expect(authService.signup(input)).rejects.toThrow(AppError);
      await expect(authService.signup(input)).rejects.toMatchObject({
        statusCode: 409,
        code: "USER_ALREADY_EXISTS",
      });
    });
  });
});
