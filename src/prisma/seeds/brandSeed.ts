import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function createBrands() {
  const sony = await db.brand.upsert({
    where: { slug: "sony" },
    update: {},
    create: { slug: "sony" },
  });

  const microsoft = await db.brand.upsert({
    where: { slug: "microsoft" },
    update: {},
    create: { slug: "microsoft" },
  });

  const nintendo = await db.brand.upsert({
    where: { slug: "nintendo" },
    update: {},
    create: { slug: "nintendo" },
  });

  const sega = await db.brand.upsert({
    where: { slug: "sega" },
    update: {},
    create: { slug: "sega" },
  });

  const atari = await db.brand.upsert({
    where: { slug: "atari" },
    update: {},
    create: { slug: "atari" },
  });

  return { sony, microsoft, nintendo, sega, atari };
}
