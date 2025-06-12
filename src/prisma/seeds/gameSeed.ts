import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function createGames() {
  const mk11 = await db.game.upsert({
    where: { slug: "mortal-kombat-11" },
    update: {},
    create: {
      slug: "mortal-kombat-11",
      translations: {
        create: [
          {
            locale: "pt",
            title: "Mortal Kombat 11",
            description: "Jogo de luta da famosa franquia Mortal Kombat.",
          },
          {
            locale: "en",
            title: "Mortal Kombat 11",
            description: "Fighting game from the famous Mortal Kombat franchise.",
          },
        ],
      },
    },
  });

  return { mk11 };
}
