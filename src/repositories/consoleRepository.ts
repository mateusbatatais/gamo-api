// src/repositories/consoleRepository.ts
import { db } from "../lib/db";

export interface ListConsoleVariantsOptions {
  brand?: string[]; // Filtro para marca
  generation?: number[]; // Filtro para geração (alterado para número)
  locale: string;
  skip: number;
  take: number;
}

export const listConsoleVariants = ({
  brand,
  generation,
  locale,
  skip,
  take,
}: ListConsoleVariantsOptions) => {
  const brandFilter =
    brand && brand.length > 0 ? { console: { brand: { slug: { in: brand } } } } : {};
  const generationFilter =
    generation && generation.length > 0 ? { console: { generation: { in: generation } } } : {};

  return db.consoleVariant.findMany({
    where: {
      ...brandFilter, // Filtro de marca
      ...generationFilter, // Filtro de geração
    },
    include: {
      console: {
        select: {
          id: true,
          slug: true,
          brand: { select: { id: true, slug: true } },
          generation: true, // Inclusão da geração
          translations: { where: { locale }, select: { name: true } },
        },
      },
      translations: {
        where: { locale },
        select: { name: true },
      },
    },
    skip,
    take,
  });
};

export const countConsoleVariants = ({ brand }: ListConsoleVariantsOptions) => {
  return db.consoleVariant.count({
    where: brand
      ? { console: { brand: { slug: { in: Array.isArray(brand) ? brand : [brand] } } } }
      : {},
  });
};
