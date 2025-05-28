// tests/services/userConsoleService.spec.ts
import * as userConsoleRepository from "../../src/repositories/userConsoleRepository";
import { addUserConsole } from "../../src/services/userConsoleService";

jest.mock("../../src/lib/db", () => ({
  db: {
    userConsole: {
      create: jest.fn().mockResolvedValue({ id: 1, note: "meu console" }),
    },
    consoleVariant: {
      findUnique: jest
        .fn()
        .mockResolvedValue({ id: 1, slug: "slim", consoleId: 1 }),
    },
    skin: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
  },
}));

describe("addUserConsole", () => {
  it("cria com sucesso um novo console na coleção", async () => {
    jest.spyOn(userConsoleRepository, "createUserConsole").mockResolvedValue({
      id: 1,
      userId: 1,
      consoleId: 1,
      consoleVariantId: 1,
      skinId: null,
      customSkin: null,
      note: "Meu console",
      photoUrl: null,
      createdAt: new Date(),
      // Relacionamentos mockados
      console: {
        id: 1,
        name: "PlayStation 5",
        brandId: 1,
        slug: "ps5",
        nickname: "PS5",
      },
      variant: {
        id: 1,
        consoleId: 1,
        name: "Digital Edition",
        slug: "digital-edition",
      },
      skin: null, // ou um objeto mock se quiser
    });

    const input = {
      consoleId: 1,
      variantSlug: "slim",
      skinSlug: null,
      customSkin: null,
      note: "meu console",
      photoUrl: null,
    };

    const result = await addUserConsole(42, input);
    expect(result).toHaveProperty("id");
    expect(result.note).toBe("meu console");
  });
});
