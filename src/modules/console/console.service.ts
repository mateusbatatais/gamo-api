// src/services/console.service.ts
import {
  listConsoleVariants,
  countConsoleVariants,
  getConsoleVariantDetails,
} from "./console.repository";
import { ConsoleVariantsResponse } from "../../types/console.type";
import { ConsoleVariantFilters } from "./console.schema";

// src/services/console.service.ts
export const getConsoleVariants = async (
  filters: ConsoleVariantFilters,
): Promise<ConsoleVariantsResponse> => {
  const countFilters = {
    brand: filters.brand,
    generation: filters.generation,
    locale: filters.locale,
    search: filters.search,
  };

  const [items, total] = await Promise.all([
    listConsoleVariants(filters),
    countConsoleVariants(countFilters),
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

export const getConsoleVariantWithSkins = async (slug: string, locale: string = "pt") => {
  const variant = await getConsoleVariantDetails(slug, locale);

  if (!variant) {
    throw new Error("Console variant not found");
  }

  return {
    id: variant.id,
    consoleId: variant.console.id,
    slug: variant.slug,
    brand: {
      id: variant.console.brand.id,
      slug: variant.console.brand.slug,
    },
    generation: variant.console.generation,
    type: variant.console.type,
    releaseDate: variant.console.releaseDate,
    name: variant.translations[0]?.name || "No Name",
    consoleName: variant.console.translations[0]?.name || "No Console Name",
    consoleDescription: variant.console.translations[0]?.description || null,
    imageUrl: variant.imageUrl,
    launchDate: variant.launchDate,
    storage: variant.storage,
    skins: variant.Skin.map((skin) => ({
      id: skin.id,
      slug: skin.slug,
      name: skin.translations[0]?.name || "No Skin Name",
      description: skin.translations[0]?.description || null,
      editionName: skin.translations[0]?.editionName || null,
      releaseDate: skin.releaseDate,
      limitedEdition: skin.limitedEdition,
      material: skin.material,
      finish: skin.finish,
      imageUrl: skin.imageUrl,
    })),
  };
};
