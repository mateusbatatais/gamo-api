// tests/services/userConsoleService.spec.ts
import { db } from "../../src/lib/db";
import { addUserConsole } from "../../src/services/userConsoleService";

jest.mock("../../src/lib/db", () => ({
  db: {
    consoleVariant: {
      findUnique: jest.fn(),
    },
    skin: {
      findUnique: jest.fn(),
    },
    userConsole: {
      create: jest.fn(),
    },
  },
}));

describe("addUserConsole", () => {
  const userId = 42;
  const input = {
    consoleId: 1,
    variantSlug: "slim",
    skinSlug: null,
    customSkin: null,
    note: "meu console",
    photoUrl: null,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("cria com sucesso um novo console na coleção quando não há skinSlug", async () => {
    // mocka variante encontrada
    (db.consoleVariant.findUnique as jest.Mock).mockResolvedValue({
      id: 10,
      consoleId: input.consoleId,
      slug: input.variantSlug,
      launchDate: null,
      storage: null,
      imageUrl: null,
    });

    // mocka nenhum skin
    (db.skin.findUnique as jest.Mock).mockResolvedValue(null);

    // mocka criação do userConsole
    const created = {
      id: 100,
      userId,
      consoleId: input.consoleId,
      consoleVariantId: 10,
      skinId: null,
      customSkin: null,
      note: input.note,
      photoUrl: input.photoUrl,
      createdAt: new Date("2025-06-07T12:00:00.000Z"),
    };
    (db.userConsole.create as jest.Mock).mockResolvedValue(created);

    const result = await addUserConsole(userId, input);

    // verifica retorno puro do create()
    expect(result).toEqual(created);

    // garante que findUnique e create foram chamados corretamente
    expect(db.consoleVariant.findUnique).toHaveBeenCalledWith({
      where: { consoleId_slug: { consoleId: input.consoleId, slug: input.variantSlug } },
    });
    expect(db.skin.findUnique).not.toHaveBeenCalled(); // sem skinSlug
    expect(db.userConsole.create).toHaveBeenCalledWith({
      data: {
        userId,
        consoleId: input.consoleId,
        consoleVariantId: 10,
        skinId: undefined,
        customSkin: null,
        note: input.note,
        photoUrl: input.photoUrl,
      },
    });
  });

  it("lança erro quando a variante não existe", async () => {
    (db.consoleVariant.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(addUserConsole(userId, input)).rejects.toThrow("Variant not found");
  });

  it("lança erro quando skinSlug inválido", async () => {
    (db.consoleVariant.findUnique as jest.Mock).mockResolvedValue({
      id: 20,
      consoleId: input.consoleId,
      slug: input.variantSlug,
      launchDate: null,
      storage: null,
      imageUrl: null,
    });
    (db.skin.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(addUserConsole(userId, { ...input, skinSlug: "no-such-skin" })).rejects.toThrow(
      "Skin not found",
    );
  });

  it("lança erro quando skin não pertence à variante", async () => {
    (db.consoleVariant.findUnique as jest.Mock).mockResolvedValue({
      id: 30,
      consoleId: input.consoleId,
      slug: input.variantSlug,
      launchDate: null,
      storage: null,
      imageUrl: null,
    });
    // skin de outro variant.id
    (db.skin.findUnique as jest.Mock).mockResolvedValue({
      id: 99,
      consoleVariantId: 999,
      slug: "other-skin",
      releaseDate: null,
      limitedEdition: null,
      editionName: null,
      material: null,
      finish: null,
      imageUrl: null,
    });

    await expect(addUserConsole(userId, { ...input, skinSlug: "other-skin" })).rejects.toThrow(
      "Skin não pertence a essa variante",
    );
  });
});
