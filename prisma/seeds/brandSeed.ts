import { PrismaClient } from "@prisma/client";

export async function createBrands(db: PrismaClient) {
  const brandsData = [
    { slug: "sony" },
    { slug: "microsoft" },
    { slug: "nintendo" },
    { slug: "sega" },
    { slug: "atari" },
  ];

  const createdBrands: Record<string, { id: number }> = {};

  for (const brand of brandsData) {
    const created = await db.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
    createdBrands[brand.slug] = created;
  }

  return createdBrands as Record<string, { id: number }>;
}
