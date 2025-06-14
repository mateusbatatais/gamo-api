// src/services/consoleService.ts
import { listConsoleVariants, countConsoleVariants } from "../repositories/consoleRepository";
import { ConsoleVariantsResponse } from "../dtos/consoleVariants.dto";

// Modificando a assinatura da função para aceitar 'brand' como 'string[]'
export const getConsoleVariants = async (options: {
  brand?: string[]; // Modificado para aceitar um array de strings
  locale: string;
  skip: number;
  take: number;
}): Promise<ConsoleVariantsResponse> => {
  const raw = await listConsoleVariants(options);

  const total = await countConsoleVariants({
    brand: options.brand, // Passando o brand como array
    locale: options.locale,
    skip: options.skip,
    take: options.take,
  });

  return {
    items: raw.map((variant) => ({
      id: variant.id,
      slug: variant.slug,
      brand: variant.console.brand,
      name: variant.translations[0]?.name || "No Name",
      consoleName: variant.console.translations[0]?.name || "No Console Name",
      imageUrl: variant.imageUrl,
    })),
    meta: {
      total,
      page: options.skip / options.take + 1,
      perPage: options.take,
      totalPages: total > 0 ? Math.ceil(total / options.take) : 1,
    },
  };
};
