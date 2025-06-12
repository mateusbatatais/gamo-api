// src/repositories/consoleRepository.ts
import { db } from "../lib/db";

export interface ListConsoleVariantsOptions {
  brandSlug?: string;
  locale: string;
  skip: number;
  take: number;
}

export const listConsoleVariants = ({
  brandSlug,
  locale,
  skip,
  take,
}: ListConsoleVariantsOptions) => {
  const brandFilter = brandSlug
    ? { console: { brand: { slug: { in: brandSlug.split(",") } } } }
    : {};

  return db.consoleVariant.findMany({
    where: brandFilter,
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

export const countConsoleVariants = ({ brandSlug }: ListConsoleVariantsOptions) => {
  return db.consoleVariant.count({
    where: brandSlug ? { console: { brand: { slug: brandSlug } } } : {},
  });
};
