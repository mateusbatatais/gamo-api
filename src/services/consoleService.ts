// src/services/consoleService.ts
import { listConsoleVariants, countConsoleVariants } from "../repositories/consoleRepository";
import { ConsoleVariantsResponse } from "../dtos/consoleVariants.dto";

export const getConsoleVariants = async (options: {
  brandSlug?: string;
  locale: string;
  skip: number;
  take: number;
}): Promise<ConsoleVariantsResponse> => {
  const raw = await listConsoleVariants(options);

  const total = await countConsoleVariants({
    brandSlug: options.brandSlug,
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
    })),
    meta: {
      total,
      page: options.skip / options.take + 1,
      perPage: options.take,
      totalPages: total > 0 ? Math.ceil(total / options.take) : 1,
    },
  };
};
