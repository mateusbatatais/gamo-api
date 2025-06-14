import { Console, ConsoleVariant, Brand, ConsoleTranslation } from "@prisma/client";

export type Fixture<T> = T & {
  [key: string]: unknown;
};

export type ConsoleVariantFixture = Fixture<ConsoleVariant> & {
  console: ConsoleFixture;
  translations: ConsoleVariantTranslationFixture[];
};

export type ConsoleFixture = Fixture<Console> & {
  brand: BrandFixture;
  translations: ConsoleTranslationFixture[];
};

export type BrandFixture = Fixture<Brand>;

export type ConsoleTranslationFixture = Fixture<ConsoleTranslation>;

export type ConsoleVariantTranslationFixture = Fixture<{
  id: number;
  variantId: number;
  locale: string;
  name: string;
}>;
