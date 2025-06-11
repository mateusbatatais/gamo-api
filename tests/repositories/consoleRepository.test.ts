// tests/repositories/consoleRepository.test.ts
import { listConsoleVariants } from "../../src/repositories/consoleRepository";
import { db } from "../../src/lib/db"; // Prisma client

jest.mock("../../src/lib/db");

describe("Console Repository", () => {
  it("should return console variants based on query parameters", async () => {
    const mockVariants = [
      {
        id: 1,
        slug: "ps5",
        console: { brand: { id: 1, slug: "sony" } },
        translations: [{ name: "PlayStation 5" }],
      },
    ];

    (db.consoleVariant.findMany as jest.Mock).mockResolvedValue(mockVariants);

    const options = { brandSlug: "sony", locale: "pt", skip: 0, take: 10 };
    const result = await listConsoleVariants(options);

    expect(result).toHaveLength(1);
    expect(result[0].translations[0].name).toBe("PlayStation 5");
  });
});
