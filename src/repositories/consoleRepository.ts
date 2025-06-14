// src/repositories/consoleRepository.ts
import { db } from "../lib/db";
import { Prisma } from "@prisma/client";

export interface ListConsoleVariantsOptions {
  brand?: string[];
  generation?: number[];
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
  // Criar um array de condições
  const conditions: Prisma.ConsoleVariantWhereInput[] = [];

  // Condição para marca
  if (brand && brand.length > 0) {
    conditions.push({
      console: {
        brand: {
          slug: { in: brand },
        },
      },
    });
  }

  // Condição para geração
  if (generation && generation.length > 0) {
    conditions.push({
      console: {
        generation: { in: generation },
      },
    });
  }

  // Condição para tradução
  conditions.push({
    translations: {
      some: { locale },
    },
  });

  // Combina todas as condições com AND
  const where: Prisma.ConsoleVariantWhereInput = conditions.length > 0 ? { AND: conditions } : {};

  return db.consoleVariant.findMany({
    where,
    include: {
      console: {
        select: {
          id: true,
          slug: true,
          brand: { select: { id: true, slug: true } },
          generation: true,
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

export const countConsoleVariants = ({ brand, generation }: ListConsoleVariantsOptions) => {
  // Mesma lógica de condições para a contagem
  const conditions: Prisma.ConsoleVariantWhereInput[] = [];

  if (brand && brand.length > 0) {
    conditions.push({
      console: {
        brand: {
          slug: { in: brand },
        },
      },
    });
  }

  if (generation && generation.length > 0) {
    conditions.push({
      console: {
        generation: { in: generation },
      },
    });
  }

  const where: Prisma.ConsoleVariantWhereInput = conditions.length > 0 ? { AND: conditions } : {};

  return db.consoleVariant.count({ where });
};
