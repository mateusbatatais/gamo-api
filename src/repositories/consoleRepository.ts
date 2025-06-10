// src/repositories/consoleRepository.ts

import { db } from "../lib/db";

export interface ListConsoleVariantsOptions {
  brandSlug?: string;
  locale: string;
  skip: number;
  take: number;
}

export const listConsoleVariants = ({ brandSlug, locale }: ListConsoleVariantsOptions) => {
  return db.consoleVariant.findMany({
    where: brandSlug ? { console: { brand: { slug: brandSlug } } } : {},
    include: {
      console: {
        select: { id: true, slug: true, brand: { select: { id: true, slug: true } } },
      },
      translations: {
        where: { locale },
        select: { name: true },
      },
    },
  });
};
