import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  // 1. Marcas
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

  // 2. Consoles com nickname
  const ps5 = await db.console.upsert({
    where: { slug: "playstation-5" },
    update: {},
    create: {
      slug: "playstation-5",
      nickname: "ps5",
      brandId: sony.id,
      translations: {
        create: [
          { locale: "pt", name: "PlayStation 5" },
          { locale: "en", name: "PlayStation 5" },
        ],
      },
    },
  });
  const xboxX = await db.console.upsert({
    where: { slug: "xbox-series-x" },
    update: {},
    create: {
      slug: "xbox-series-x",
      nickname: "xboxx",
      brandId: microsoft.id,
      translations: {
        create: [
          { locale: "pt", name: "Xbox Series X" },
          { locale: "en", name: "Xbox Series X" },
        ],
      },
    },
  });

  // 3. Variações PS5
  const [fat, slim, pro] = await Promise.all([
    db.consoleVariant.upsert({
      where: { consoleId_slug: { consoleId: ps5.id, slug: "fat" } },
      update: {},
      create: { consoleId: ps5.id, slug: "fat" },
    }),
    db.consoleVariant.upsert({
      where: { consoleId_slug: { consoleId: ps5.id, slug: "slim" } },
      update: {},
      create: { consoleId: ps5.id, slug: "slim" },
    }),
    db.consoleVariant.upsert({
      where: { consoleId_slug: { consoleId: ps5.id, slug: "pro" } },
      update: {},
      create: { consoleId: ps5.id, slug: "pro" },
    }),
  ]);

  // 4. Skin exemplo (PS5 Slim)
  await db.skin.create({
    data: {
      consoleVariantId: slim.id,
      slug: "midnight-black",
      translations: {
        create: [
          { locale: "pt", name: "Preto Meia-Noite" },
          { locale: "en", name: "Midnight Black" },
        ],
      },
    },
  });

  // 5. Acessórios PS5
  await db.accessory.upsert({
    where: { slug: "dualsense-controller" },
    update: {},
    create: {
      slug: "dualsense-controller",
      consoleId: ps5.id,
      translations: {
        create: [
          {
            locale: "pt",
            name: "Controle DualSense",
            description: "Controle oficial PS5",
          },
          {
            locale: "en",
            name: "DualSense Controller",
            description: "Official PS5 controller",
          },
        ],
      },
    },
  });

  // 6. Jogos e edições
  const sm2 = await db.game.upsert({
    where: { slug: "spider-man-2" },
    update: {},
    create: {
      slug: "spider-man-2",
      translations: {
        create: [
          { locale: "pt", title: "Homem-Aranha 2" },
          { locale: "en", title: "Spider-Man 2" },
        ],
      },
    },
  });
  await Promise.all([
    db.gameEdition.upsert({
      where: { gameId_consoleId: { gameId: sm2.id, consoleId: ps5.id } },
      update: {},
      create: { gameId: sm2.id, consoleId: ps5.id },
    }),
    db.gameEdition.upsert({
      where: { gameId_consoleId: { gameId: sm2.id, consoleId: xboxX.id } },
      update: {},
      create: { gameId: sm2.id, consoleId: xboxX.id },
    }),
  ]);

  console.log("✅ Seed completo!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
