import { Prisma } from "@prisma/client";
import { db } from "../../core/db";

export interface ListConsoleVariantsOptions {
  brand?: string[];
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
