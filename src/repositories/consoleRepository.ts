// src/repositories/consoleRepository.ts
import { db } from "../lib/db";
export interface ListConsoleVariantsOptions {
  brand?: string[]; // Aceita um array de strings agora
  locale: string;
  skip: number;
  take: number;
}

export const listConsoleVariants = ({ brand, locale, skip, take }: ListConsoleVariantsOptions) => {
  // Ajuste no filtro do 'brand'
  const brandFilter =
    brand && brand.length > 0 ? { console: { brand: { slug: { in: brand } } } } : {};

  return db.consoleVariant.findMany({
    where: brandFilter, // Aplicando o filtro adequado
    include: {
      console: {
        select: {
          id: true,
          slug: true,
          brand: { select: { id: true, slug: true } },
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
