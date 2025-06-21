import { PrismaClient } from "@prisma/client";

export async function createGames(db: PrismaClient) {
  await db.game.upsert({
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

  // Adicione outros jogos aqui conforme necessário
}
