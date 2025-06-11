// tests/services/consoleService.test.ts
import { getConsoleVariants } from "../../src/services/consoleService";
import * as consoleRepository from "../../src/repositories/consoleRepository";
import { ConsoleVariantsResponse } from "../../src/dtos/consoleVariants.dto";

// Mockando o repositório
jest.mock("../../src/repositories/consoleRepository");

describe("Console Service", () => {
  it("should return console variants with pagination", async () => {
    const mockVariants = [
      {
        id: 1,
        slug: "ps5",
        console: { brand: { id: 1, slug: "sony" } },
        translations: [{ name: "PlayStation 5" }],
      },
    ];

    const mockTotal = [
      {
        id: 1,
        slug: "ps5",
        console: { brand: { id: 1, slug: "sony" } },
        translations: [{ name: "PlayStation 5" }],
      },
    ];

    // Mockando a resposta do repositório
    (consoleRepository.listConsoleVariants as jest.Mock).mockResolvedValue(mockVariants);
    (consoleRepository.listConsoleVariants as jest.Mock).mockResolvedValueOnce(mockTotal);

    const options = { brandSlug: "sony", locale: "pt", skip: 0, take: 10 };
    const result = await getConsoleVariants(options);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe("PlayStation 5");
    expect(result.meta.total).toBe(mockTotal.length);
    expect(result.meta.totalPages).toBe(1);
  });
});
