// src/services/consoleService.ts
import { listConsoleVariants, countConsoleVariants } from "../repositories/consoleRepository";
import { ConsoleVariantsResponse } from "../dtos/consoleVariants.dto";

export const getConsoleVariants = async (options: {
  brand?: string[]; // Filtro de marcas
  generation?: string[]; // Agora aceitando o filtro de geração como string[]
  locale: string;
  skip: number;
  take: number;
}): Promise<ConsoleVariantsResponse> => {
  // Convertendo a geração de string[] para number[] (se existir)
  const generation = options.generation ? options.generation.map(Number) : undefined;

  const raw = await listConsoleVariants({
    brand: options.brand,
    generation, // Passando geração já convertida para número
    locale: options.locale,
    skip: options.skip,
    take: options.take,
  });

  const total = await countConsoleVariants({
    brand: options.brand,
    generation, // Passando geração também para contagem
    locale: options.locale,
    skip: options.skip,
    take: options.take,
  });

  return {
    items: raw.map((variant) => ({
      id: variant.id,
      slug: variant.slug,
      brand: variant.console.brand,
      generation: variant.console.generation, // Incluindo a geração na resposta
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
