import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  // 0. Usuário administrador
  await db.user.upsert({
    where: { email: "admin@gamo.games" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@gamo.games",
      password: await bcrypt.hash("1234", 10),
      role: "SUPER_ADMIN",
      emailVerified: true,
    },
  });

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

  // 2. Consoles (sem 'name' direto; criamos traduções em ConsoleTranslation)
  const ps5 = await db.console.upsert({
    where: { slug: "playstation-5" },
    update: {
      // Se quiser atualizar algum campo “fixo” em updates futuros, pode colocar aqui
    },
    create: {
      slug: "playstation-5",
      nickname: "ps5",
      brandId: sony.id,
      releaseDate: new Date("2020-11-12"), // exemplo de data oficial
      generation: "9ª geração",
      translations: {
        create: [
          {
            locale: "pt",
            name: "PlayStation 5",
            description:
              "O PlayStation 5 é o console de próxima geração da Sony, lançado em novembro de 2020.",
          },
          {
            locale: "en",
            name: "PlayStation 5",
            description:
              "The PlayStation 5 is Sony’s next-generation console, released in November 2020.",
          },
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
      releaseDate: new Date("2020-11-10"), // exemplo de data oficial
      generation: "9ª geração",
      translations: {
        create: [
          {
            locale: "pt",
            name: "Xbox Série X",
            description:
              "O Xbox Série X é o console de nova geração da Microsoft, lançado em novembro de 2020.",
          },
          {
            locale: "en",
            name: "Xbox Series X",
            description:
              "The Xbox Series X is Microsoft’s next-generation console, released in November 2020.",
          },
        ],
      },
    },
  });

  // 3. Variações do PS5 (sem 'name' direto; criamos traduções depois)
  const [ps5Slim] = await Promise.all([
    db.consoleVariant.upsert({
      where: { consoleId_slug: { consoleId: ps5.id, slug: "fat" } },
      update: {
        // atualizações “fixas” de storage, launchDate, etc., se necessário
      },
      create: {
        consoleId: ps5.id,
        slug: "fat",
        launchDate: new Date("2020-11-12"), // mesma data de lançamento base
        storage: "825 GB", // exemplo de armazenamento
        imageUrl: "https://example.com/images/ps5-fat.png", // URL ilustrativa
        translations: {
          create: [
            { locale: "pt", name: "Modelo Padrão" },
            { locale: "en", name: "Standard Model" },
          ],
        },
      },
    }),

    db.consoleVariant.upsert({
      where: { consoleId_slug: { consoleId: ps5.id, slug: "slim" } },
      update: {},
      create: {
        consoleId: ps5.id,
        slug: "slim",
        launchDate: new Date("2023-09-01"), // exemplo fictício
        storage: "1 TB",
        imageUrl: "https://example.com/images/ps5-slim.png",
        translations: {
          create: [
            { locale: "pt", name: "Slim" },
            { locale: "en", name: "Slim" },
          ],
        },
      },
    }),

    db.consoleVariant.upsert({
      where: { consoleId_slug: { consoleId: ps5.id, slug: "pro" } },
      update: {},
      create: {
        consoleId: ps5.id,
        slug: "pro",
        launchDate: new Date("2022-04-15"), // exemplo fictício
        storage: "2 TB",
        imageUrl: "https://example.com/images/ps5-pro.png",
        translations: {
          create: [
            { locale: "pt", name: "Pro" },
            { locale: "en", name: "Pro" },
          ],
        },
      },
    }),
  ]);

  // 4. Skin do PS5 Slim (agora armazenamos 'name', 'description' e 'editionName' em SkinTranslation)
  await db.skin.upsert({
    where: { slug: "midnight-black" },
    update: {},
    create: {
      slug: "midnight-black",
      consoleVariantId: ps5Slim.id,
      releaseDate: new Date("2023-09-01"), // data fictícia de lançamento da skin
      limitedEdition: false,
      editionName: null, // como não é edição limitada, deixamos null
      material: "Plástico ABS",
      finish: "Matte",
      imageUrl: "https://example.com/images/skin-midnight-black.png",
      translations: {
        create: [
          {
            locale: "pt",
            name: "Preto Meia-Noite",
            description: "Skin preta fosca para PS5 Slim, com detalhes em azul escuro.",
            editionName: null,
          },
          {
            locale: "en",
            name: "Midnight Black",
            description: "Matte black skin for PS5 Slim, featuring dark blue accents.",
            editionName: null,
          },
        ],
      },
    },
  });

  // 5. Acessório PS5 (continua tudo igual, pois já tinha tradução correta)
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
            description: "Controle oficial do PS5 com feedback háptico.",
          },
          {
            locale: "en",
            name: "DualSense Controller",
            description: "Official PS5 controller with haptic feedback.",
          },
        ],
      },
    },
  });

  // 6. Jogo e GameEdition (sem alterações, pois já estavam corretos)
  const sm2 = await db.game.upsert({
    where: { slug: "spider-man-2" },
    update: {},
    create: {
      slug: "spider-man-2",
      translations: {
        create: [
          { locale: "pt", title: "Homem-Aranha 2", description: null },
          { locale: "en", title: "Spider-Man 2", description: null },
        ],
      },
    },
  });

  await Promise.all([
    db.gameEdition.upsert({
      where: { gameId_consoleId: { gameId: sm2.id, consoleId: ps5.id } },
      update: {},
      create: { gameId: sm2.id, consoleId: ps5.id, coverUrl: null },
    }),
    db.gameEdition.upsert({
      where: {
        gameId_consoleId: { gameId: sm2.id, consoleId: xboxX.id },
      },
      update: {},
      create: { gameId: sm2.id, consoleId: xboxX.id, coverUrl: null },
    }),
  ]);

  console.log("✅ Seed completo!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
