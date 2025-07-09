import { Prisma } from "@prisma/client";
import { db } from "../../core/db";
import { normalizeSearch } from "../../shared/normalize";
import { ConsoleSortOption } from "./console.schema";

export interface ListConsoleVariantsOptions {
  brand?: string[];
  search?: string;
  sort?: ConsoleSortOption;
  generation?: number[];
  locale: string;
  skip: number;
  take: number;
}

export const listConsoleVariants = async (
  options: ListConsoleVariantsOptions,
): Promise<
  Prisma.ConsoleVariantGetPayload<{
    include: {
      console: {
        select: {
          id: true;
          slug: true;
          brand: { select: { id: true; slug: true } };
          generation: true;
          translations: { where: { locale: string }; select: { name: true } };
        };
      };
      translations: { where: { locale: string }; select: { name: true } };
    };
  }>[]
> => {
  const conditions: Prisma.ConsoleVariantWhereInput[] = [];

  if (options.brand?.length) {
    conditions.push({
      console: {
        brand: { slug: { in: options.brand } },
      },
    });
  }

  if (options.generation?.length) {
    conditions.push({
      console: { generation: { in: options.generation } },
    });
  }

  conditions.push({
    translations: { some: { locale: options.locale } },
  });

  if (options.search) {
    const searchWords = normalizeSearch(options.search);
    const searchConditions: Prisma.ConsoleVariantWhereInput[] = [];

    // Para cada palavra, criar condições OR
    searchWords.forEach((word) => {
      searchConditions.push({
        OR: [
          // Busca em traduções do variant
          {
            translations: {
              some: {
                name: {
                  contains: word,
                  mode: "insensitive",
                },
              },
            },
          },
          // Busca em traduções do console
          {
            console: {
              translations: {
                some: {
                  OR: [
                    { name: { contains: word, mode: "insensitive" } },
                    { description: { contains: word, mode: "insensitive" } },
                  ],
                },
              },
            },
          },
          // Busca em campos diretos
          { slug: { contains: word, mode: "insensitive" } },
          {
            console: {
              OR: [
                { slug: { contains: word, mode: "insensitive" } },
                { nickname: { contains: word, mode: "insensitive" } },
              ],
            },
          },
        ],
      });
    });

    // Combinar todas as palavras com AND
    conditions.push({ AND: searchConditions });
  }

  // Definir ordenação
  const orderBy: Prisma.ConsoleVariantOrderByWithRelationInput[] = [];

  switch (options.sort) {
    case "name-asc":
      // Ordenar pelo nome da tradução em ordem alfabética
      orderBy.push({ translations: { _count: "asc" } });
      orderBy.push({ slug: "asc" });
      break;

    case "name-desc":
      orderBy.push({ translations: { _count: "desc" } });
      orderBy.push({ slug: "desc" });
      break;

    case "releaseDate-asc":
      // Ordenar pela data de lançamento do console (mais antigos primeiro)
      orderBy.push({ console: { releaseDate: "asc" } });
      break;

    case "releaseDate-desc":
      // Ordenar pela data de lançamento do console (mais novos primeiro)
      orderBy.push({ console: { releaseDate: "desc" } });
      break;

    default:
      // Ordenação padrão (name-asc)
      orderBy.push({ slug: "asc" });
  }

  return db.consoleVariant.findMany({
    where: { AND: conditions },
    include: {
      console: {
        select: {
          id: true,
          slug: true,
          generation: true,
          brand: { select: { id: true, slug: true } },
          translations: {
            where: { locale: options.locale },
            select: { name: true },
          },
        },
      },
      translations: {
        where: { locale: options.locale },
        select: { name: true },
      },
    },
    skip: options.skip,
    take: options.take,
    orderBy,
  });
};

export const countConsoleVariants = async (
  options: Omit<ListConsoleVariantsOptions, "skip" | "take">,
) => {
  const conditions: Prisma.ConsoleVariantWhereInput[] = [];

  if (options.brand?.length) {
    conditions.push({
      console: {
        brand: { slug: { in: options.brand } },
      },
    });
  }

  if (options.generation?.length) {
    conditions.push({
      console: { generation: { in: options.generation } },
    });
  }

  return db.consoleVariant.count({
    where: { AND: conditions },
  });
};

export const getConsoleVariantDetails = async (slug: string, locale: string) => {
  return db.consoleVariant.findFirst({
    where: {
      slug,
      translations: {
        some: { locale },
      },
    },
    include: {
      console: {
        include: {
          brand: {
            select: {
              id: true,
              slug: true,
            },
          },
          translations: {
            where: { locale },
            select: { name: true, description: true },
          },
        },
      },
      translations: {
        where: { locale },
        select: { name: true },
      },
      Skin: {
        include: {
          translations: {
            where: { locale },
            select: {
              name: true,
              description: true,
              editionName: true,
            },
          },
        },
      },
    },
  });
};
