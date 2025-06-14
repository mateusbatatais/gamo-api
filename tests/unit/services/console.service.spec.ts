import { getConsoleVariants } from "../../../src/services/console.service";
import {
  listConsoleVariants,
  countConsoleVariants,
} from "../../../src/repositories/console.repository";

jest.mock("../../../src/repositories/console.repository");

describe("Console Service", () => {
  it("deve formatar corretamente os dados do repositório", async () => {
    (listConsoleVariants as jest.Mock).mockResolvedValue([
      {
        id: 1,
        slug: "ps5-digital",
        translations: [{ name: "PS5 Digital" }],
        console: {
          brand: { id: 1, slug: "sony" },
          translations: [{ name: "PlayStation 5" }],
        },
      },
    ]);

    // Adicione este mock para countConsoleVariants
    (countConsoleVariants as jest.Mock).mockResolvedValue(1);

    const result = await getConsoleVariants({
      locale: "pt",
      skip: 0,
      take: 20,
    });

    expect(result.items[0].name).toBe("PS5 Digital");
    expect(result.items[0].brand.slug).toBe("sony");
    expect(result.meta.total).toBe(1);
  });
});
