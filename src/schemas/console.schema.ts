// src/schemas/console.schema.ts
import { z } from "zod";

// Tipo para locale
export const LocaleSchema = z.enum(["pt", "en"]);
export type Locale = z.infer<typeof LocaleSchema>;

// Schema principal
export const ListConsoleVariantsSchema = z.object({
  brand: z.string().optional(),
  generation: z.string().optional(),
  locale: LocaleSchema.default("pt"),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
});

// Tipo de entrada (para o controller)
export type ListConsoleVariantsInput = {
  brand?: string;
  generation?: string;
  locale: Locale;
  page: number;
  perPage: number;
};

// Tipo de saída (para o service)
export type ConsoleVariantFilters = {
  brand?: string[];
  generation?: number[];
  locale: Locale;
  skip: number;
  take: number;
};
