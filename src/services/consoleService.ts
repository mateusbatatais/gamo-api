// src/services/consoleService.ts
import { listConsoleVariants } from "../repositories/consoleRepository";
import { ConsoleVariantsResponse } from "../dtos/consoleVariants.dto";

export const getConsoleVariants = async (options: {
  brandSlug?: string;
  locale: string;
  skip: number;
  take: number;
}): Promise<ConsoleVariantsResponse> => {
  const raw = await listConsoleVariants(options);
  const total = await listConsoleVariants({
    ...options,
    skip: 0,
    take: 0,
  });

  return {
    items: raw.map((variant) => ({
      id: variant.id,
      slug: variant.slug,
      brand: variant.console.brand,
      name: variant.translations[0]?.name || "No Name",
      consoleName: variant.console.translations[0]?.name || "No Console Name", // Adicionando o nome do console
    })),
    meta: {
      total: total.length,
      page: options.skip / options.take + 1,
      perPage: options.take,
      totalPages: Math.ceil(total.length / options.take),
    },
  };
};
