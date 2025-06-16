import { vi } from "vitest";
import dotenv from "dotenv";

// Configurar variáveis de ambiente
dotenv.config({ path: ".env.test" });

// Mock global do Prisma
vi.mock("./core/db", () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    consoleVariant: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
    // Adicione outros modelos conforme necessário
  },
}));

// Mock do Firebase
vi.mock("firebase-admin/auth", () => ({
  getAuth: vi.fn(() => ({
    verifyIdToken: vi.fn(),
  })),
}));

// Mock do Cloudinary
vi.mock("cloudinary", () => ({
  v2: {
    config: vi.fn(),
    uploader: {
      upload_stream: vi.fn(),
    },
  },
}));
