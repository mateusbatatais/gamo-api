// src/services/console.service.ts
import { listConsoleVariants, countConsoleVariants } from "./console.repository";
import { ConsoleVariantsResponse } from "../../types/console.type";
import { ConsoleVariantFilters } from "./console.schema";

// src/services/console.service.ts
export const getConsoleVariants = async (
  filters: ConsoleVariantFilters,
): Promise<ConsoleVariantsResponse> => {
  const [items, total] = await Promise.all([
    listConsoleVariants(filters),
    countConsoleVariants(filters),
  ]);

  return {
    items: items.map((variant) => ({
      id: variant.id,
      slug: variant.slug,
      brand: variant.console.brand,
      generation: variant.console.generation ?? undefined, // Converte null para undefined
      name: variant.translations[0]?.name || "No Name",
      consoleName: variant.console.translations[0]?.name || "No Console Name",
      imageUrl: variant.imageUrl ?? undefined, // Converte null para undefined
    })),
    meta: {
      total,
      page: Math.floor(filters.skip / filters.take) + 1,
      perPage: filters.take,
      totalPages: Math.ceil(total / filters.take),
    },
  };
};
