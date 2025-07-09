// src/schemas/console.schema.ts
import { z } from "zod";

export const ConsoleSortOptionSchema = z.enum([
  "name-asc",
  "name-desc",
  "releaseDate-asc",
  "releaseDate-desc",
  "popularity-desc",
]);
export type ConsoleSortOption = z.infer<typeof ConsoleSortOptionSchema>;

// Tipo para locale
export const LocaleSchema = z.enum(["pt", "en"]);
export type Locale = z.infer<typeof LocaleSchema>;

// Schema principal para query parameters
export const ListConsoleVariantsSchema = z.object({
  brand: z.string().optional(),
  generation: z.string().optional(),
  locale: LocaleSchema.default("pt"),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  sort: ConsoleSortOptionSchema.default("releaseDate-desc"),
});

// Tipo de entrada (para o controller)
export type ListConsoleVariantsInput = z.infer<typeof ListConsoleVariantsSchema>;

// Tipo de saída (para o service)
export type ConsoleVariantFilters = {
  brand?: string[];
  generation?: number[];
  locale: Locale;
  skip: number;
  take: number;
  search?: string;
  sort?: ConsoleSortOption;
};
