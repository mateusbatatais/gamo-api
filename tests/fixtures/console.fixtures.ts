import { BrandFixture, ConsoleTranslationFixture, ConsoleVariantTranslationFixture } from "./types";

import { Console, ConsoleVariant, Brand, ConsoleTranslation } from "@prisma/client";

// Tipo para Console com relacionamentos
type ConsoleWithRelations = Console & {
  brand: Brand;
  translations: ConsoleTranslation[];
};

export const mockBrand = (overrides?: Partial<BrandFixture>): BrandFixture => ({
  id: 1,
  slug: "sony",
  ...overrides,
});

export const mockConsoleTranslation = (
  overrides?: Partial<ConsoleTranslationFixture>,
): ConsoleTranslationFixture => ({
  id: 1,
  consoleId: 1,
  locale: "pt",
  name: "PlayStation 5",
  description: null,
  ...overrides,
});

export const mockConsoleVariantTranslation = (
  overrides?: Partial<ConsoleVariantTranslationFixture>,
): ConsoleVariantTranslationFixture => ({
  id: 1,
  variantId: 1,
  locale: "pt",
  name: "Edição Digital",
  ...overrides,
});

export const mockConsoleVariant = (overrides?: Partial<ConsoleVariant>): ConsoleVariant => ({
  id: 1,
  slug: "ps5-digital",
  consoleId: 1,
  launchDate: new Date(),
  storage: "825GB",
  imageUrl: "https://example.com/ps5-digital.jpg",
  ...overrides,
});

export const mockConsole = (overrides?: Partial<ConsoleWithRelations>): ConsoleWithRelations => ({
  id: 1,
  slug: "playstation-5",
  nickname: "PS5",
  releaseDate: new Date(),
  generation: 9,
  type: "Home console",
  brandId: 1,
  brand: {
    id: 1,
    slug: "sony",
  },
  translations: [
    {
      id: 1,
      consoleId: 1,
      locale: "pt",
      name: "PlayStation 5",
      description: null,
    },
  ],
  ...overrides,
});
