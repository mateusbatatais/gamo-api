import { PrismaClient } from "@prisma/client";
import { createConsoleVariants } from "./consoleVariantSeed";

const db = new PrismaClient();

export async function createSkins() {
  const variants = await createConsoleVariants();

  // Função auxiliar para criar skins
  const createSkin = async (
    consoleVariantId: number,
    slug: string,
    colorPt: string,
    colorEn: string,
    releaseDate: Date,
    limitedEdition: boolean,
    editionName: string | null,
    material: string,
    finish: string,
    imageUrl: string,
  ) => {
    return db.skin.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        consoleVariantId,
        releaseDate,
        limitedEdition,
        editionName,
        material,
        finish,
        imageUrl,
        translations: {
          create: [
            {
              locale: "pt",
              name: colorPt,
              description:
                limitedEdition && editionName
                  ? `${editionName} (${material}, ${finish})`
                  : `${colorPt} (${material}, ${finish})`,
            },
            {
              locale: "en",
              name: colorEn,
              description:
                limitedEdition && editionName
                  ? `${editionName} (${material}, ${finish})`
                  : `${colorEn} (${material}, ${finish})`,
            },
          ],
        },
      },
    });
  };

  // ========================
  // PlayStation 1 (Fat)
  // ========================
  await createSkin(
    variants.ps1Fat.id,
    "ps1-fat-grey",
    "Cinza",
    "Grey",
    new Date("1994-12-03"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps1-fat-grey.webp",
  );

  await createSkin(
    variants.ps1Fat.id,
    "ps1-fat-net-yaroze",
    "Preto Net Yaroze",
    "Net Yaroze Black",
    new Date("1997-05-01"),
    true,
    "Net Yaroze Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps1-net-yaroze.webp",
  );

  await createSkin(
    variants.ps1Fat.id,
    "ps1-fat-resident-evil",
    "Resident Evil Edition",
    "Resident Evil Edition",
    new Date("1997-07-25"),
    true,
    "Resident Evil",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps1-fat-re.webp",
  );

  await createSkin(
    variants.ps1Fat.id,
    "ps1-fat-lsdj",
    "Lemon Sky Dreamcast Japan",
    "Lemon Sky Dreamcast Japan",
    new Date("1998-03-01"),
    true,
    "LSDJ Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps1-lsdj.webp",
  );

  // ========================
  // PlayStation 1 (Slim - PSOne)
  // ========================
  await createSkin(
    variants.ps1Slim.id,
    "ps1-slim-white",
    "Branco",
    "White",
    new Date("2000-07-07"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps1-slim-white.webp",
  );

  await createSkin(
    variants.ps1Slim.id,
    "ps1-slim-smoke",
    "Fumaça",
    "Smoke",
    new Date("2000-11-15"),
    true,
    "Smoke Black",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps1-slim-smoke.webp",
  );

  await createSkin(
    variants.ps1Slim.id,
    "ps1-slim-racing",
    "Rally Championship",
    "Rally Championship",
    new Date("2001-03-01"),
    true,
    "Rally Championship",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps1-rally.webp",
  );

  await createSkin(
    variants.ps1Slim.id,
    "ps1-slim-sakura",
    "Sakura Taisen",
    "Sakura Taisen",
    new Date("2001-07-12"),
    true,
    "Sakura Taisen Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps1-sakura.webp",
  );

  // ========================
  // PlayStation 2 (Fat)
  // ========================
  await createSkin(
    variants.ps2Fat.id,
    "ps2-fat-black",
    "Preto",
    "Black",
    new Date("2000-03-04"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps2-fat-black.webp",
  );

  await createSkin(
    variants.ps2Fat.id,
    "ps2-fat-satin-silver",
    "Prata Cetim",
    "Satin Silver",
    new Date("2002-09-01"),
    true,
    "Satin Silver Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps2-satin-silver.webp",
  );

  await createSkin(
    variants.ps2Fat.id,
    "ps2-fat-aqua-blue",
    "Azul Água",
    "Aqua Blue",
    new Date("2003-04-01"),
    true,
    "Aqua Blue Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps2-aqua-blue.webp",
  );

  await createSkin(
    variants.ps2Fat.id,
    "ps2-fat-final-fantasy",
    "Final Fantasy XI",
    "Final Fantasy XI",
    new Date("2004-03-18"),
    true,
    "Final Fantasy XI Bundle",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps2-ffxi.webp",
  );

  // ========================
  // PlayStation 2 (Slim)
  // ========================
  await createSkin(
    variants.ps2Slim.id,
    "ps2-slim-black",
    "Preto",
    "Black",
    new Date("2004-11-01"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps2-slim-black.webp",
  );

  await createSkin(
    variants.ps2Slim.id,
    "ps2-slim-ceramic-white",
    "Branco Cerâmico",
    "Ceramic White",
    new Date("2005-06-15"),
    true,
    "Ceramic White Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps2-ceramic-white.webp",
  );

  await createSkin(
    variants.ps2Slim.id,
    "ps2-slim-pink",
    "Rosa",
    "Pink",
    new Date("2006-03-01"),
    true,
    "Pink Sakura Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps2-pink.webp",
  );

  await createSkin(
    variants.ps2Slim.id,
    "ps2-slim-gold",
    "Dourado",
    "Gold",
    new Date("2006-12-01"),
    true,
    "24K Gold Limited",
    "Plástico ABS com revestimento metálico",
    "Brilhante",
    "images/skins/sony/ps2-gold.webp",
  );

  // ========================
  // PlayStation 3 (Fat)
  // ========================
  await createSkin(
    variants.ps3Fat.id,
    "ps3-fat-black",
    "Preto Brilhante",
    "Piano Black",
    new Date("2006-11-11"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps3-fat-black.webp",
  );

  await createSkin(
    variants.ps3Fat.id,
    "ps3-fat-chrome",
    "Cromado",
    "Chrome",
    new Date("2007-11-01"),
    true,
    "Chrome Edition",
    "Metalizado",
    "Espelhado",
    "images/skins/sony/ps3-chrome.webp",
  );

  await createSkin(
    variants.ps3Fat.id,
    "ps3-fat-mgs4",
    "Metal Gear Solid 4",
    "Metal Gear Solid 4",
    new Date("2008-06-12"),
    true,
    "MGS4 Guns of the Patriots",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps3-mgs4.webp",
  );

  await createSkin(
    variants.ps3Fat.id,
    "ps3-fat-white",
    "Branco",
    "White",
    new Date("2009-01-01"),
    true,
    "Ceramic White Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps3-white.webp",
  );

  // ========================
  // PlayStation 3 (Slim)
  // ========================
  await createSkin(
    variants.ps3Slim.id,
    "ps3-slim-matte-black",
    "Preto Fosco",
    "Matte Black",
    new Date("2009-09-01"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps3-slim-black.webp",
  );

  await createSkin(
    variants.ps3Slim.id,
    "ps3-slim-red",
    "Vermelho Carmim",
    "Scarlet Red",
    new Date("2010-09-01"),
    true,
    "Scarlet Red Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps3-slim-red.webp",
  );

  await createSkin(
    variants.ps3Slim.id,
    "ps3-slim-blue",
    "Azul Oceano",
    "Ocean Blue",
    new Date("2010-10-01"),
    true,
    "Ocean Blue Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps3-slim-blue.webp",
  );

  await createSkin(
    variants.ps3Slim.id,
    "ps3-slim-god-of-war",
    "God of War Saga",
    "God of War Saga",
    new Date("2012-08-28"),
    true,
    "God of War Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps3-gow.webp",
  );

  // ========================
  // PlayStation 3 (Super Slim)
  // ========================
  await createSkin(
    variants.ps3SuperSlim.id,
    "ps3-ss-black",
    "Preto",
    "Black",
    new Date("2012-09-01"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps3-ss-black.webp",
  );

  await createSkin(
    variants.ps3SuperSlim.id,
    "ps3-ss-white",
    "Branco",
    "White",
    new Date("2012-10-01"),
    true,
    "White Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps3-ss-white.webp",
  );

  await createSkin(
    variants.ps3SuperSlim.id,
    "ps3-ss-red",
    "Vermelho",
    "Red",
    new Date("2013-02-01"),
    true,
    "Red Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps3-ss-red.webp",
  );

  await createSkin(
    variants.ps3SuperSlim.id,
    "ps3-ss-blue",
    "Azul",
    "Blue",
    new Date("2013-02-01"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps3-ss-blue.webp",
  );

  // ========================
  // PlayStation 4 (Fat)
  // ========================
  await createSkin(
    variants.ps4Fat.id,
    "ps4-fat-black",
    "Preto Fosco",
    "Matte Black",
    new Date("2013-11-15"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps4-fat-black.webp",
  );

  await createSkin(
    variants.ps4Fat.id,
    "ps4-fat-glacier-white",
    "Branco Gelo",
    "Glacier White",
    new Date("2014-09-09"),
    true,
    "Destiny Bundle",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps4-fat-white.webp",
  );

  await createSkin(
    variants.ps4Fat.id,
    "ps4-fat-blue",
    "Azul Wave",
    "Wave Blue",
    new Date("2015-06-01"),
    true,
    "Limited Edition Blue",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps4-blue.webp",
  );

  await createSkin(
    variants.ps4Fat.id,
    "ps4-fat-500m",
    "500 Million Limited",
    "500 Million Limited",
    new Date("2018-08-24"),
    true,
    "500 Million Edition",
    "Plástico translúcido",
    "Brilhante",
    "images/skins/sony/ps4-500m.webp",
  );

  // ========================
  // PlayStation 4 (Slim)
  // ========================
  await createSkin(
    variants.ps4Slim.id,
    "ps4-slim-black",
    "Preto Fosco",
    "Matte Black",
    new Date("2016-09-15"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps4-slim-black.webp",
  );

  await createSkin(
    variants.ps4Slim.id,
    "ps4-slim-gold",
    "Dourado",
    "Gold",
    new Date("2017-01-01"),
    true,
    "Golden Limited",
    "Plástico ABS com revestimento metálico",
    "Brilhante",
    "images/skins/sony/ps4-gold.webp",
  );

  await createSkin(
    variants.ps4Slim.id,
    "ps4-slim-uncharted",
    "Uncharted 4",
    "Uncharted 4",
    new Date("2017-03-01"),
    true,
    "Uncharted 4 Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps4-uncharted.webp",
  );

  await createSkin(
    variants.ps4Slim.id,
    "ps4-slim-rose-gold",
    "Rosa Dourado",
    "Rose Gold",
    new Date("2018-02-01"),
    true,
    "Rose Gold Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps4-rose-gold.webp",
  );

  // ========================
  // PlayStation 4 (Pro)
  // ========================
  await createSkin(
    variants.ps4Pro.id,
    "ps4-pro-black",
    "Preto Fosco",
    "Matte Black",
    new Date("2016-11-10"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps4-pro-black.webp",
  );

  await createSkin(
    variants.ps4Pro.id,
    "ps4-pro-god-of-war",
    "God of War",
    "God of War",
    new Date("2018-04-20"),
    true,
    "God of War Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps4-pro-gow.webp",
  );

  await createSkin(
    variants.ps4Pro.id,
    "ps4-pro-500m",
    "500 Million Pro",
    "500 Million Pro",
    new Date("2018-08-24"),
    true,
    "500 Million Edition",
    "Plástico translúcido",
    "Brilhante",
    "images/skins/sony/ps4-pro-500m.webp",
  );

  await createSkin(
    variants.ps4Pro.id,
    "ps4-pro-death-stranding",
    "Death Stranding",
    "Death Stranding",
    new Date("2019-11-08"),
    true,
    "Death Stranding Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps4-pro-death-stranding.webp",
  );

  // ========================
  // PlayStation 5 (Standard)
  // ========================
  await createSkin(
    variants.ps5Standard.id,
    "ps5-standard-white-black",
    "Branco e Preto",
    "White and Black",
    new Date("2020-11-12"),
    false,
    null,
    "Plástico ABS",
    "Fosco e Brilhante",
    "images/skins/sony/ps5-standard.webp",
  );

  await createSkin(
    variants.ps5Standard.id,
    "ps5-standard-cosmic-red",
    "Vermelho Cósmico",
    "Cosmic Red",
    new Date("2021-06-11"),
    true,
    "Cosmic Red",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps5-red.webp",
  );

  await createSkin(
    variants.ps5Standard.id,
    "ps5-standard-god-of-war",
    "God of War Ragnarök",
    "God of War Ragnarök",
    new Date("2022-11-09"),
    true,
    "God of War Ragnarök Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps5-gow.webp",
  );

  await createSkin(
    variants.ps5Standard.id,
    "ps5-standard-spider-man",
    "Spider-Man 2",
    "Spider-Man 2",
    new Date("2023-10-20"),
    true,
    "Spider-Man 2 Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps5-spiderman.webp",
  );

  // ========================
  // PlayStation 5 (Digital)
  // ========================
  await createSkin(
    variants.ps5Digital.id,
    "ps5-digital-white-black",
    "Branco e Preto",
    "White and Black",
    new Date("2020-11-12"),
    false,
    null,
    "Plástico ABS",
    "Fosco e Brilhante",
    "images/skins/sony/ps5-digital.webp",
  );

  await createSkin(
    variants.ps5Digital.id,
    "ps5-digital-nova-pink",
    "Rosa Nova",
    "Nova Pink",
    new Date("2022-01-14"),
    true,
    "Nova Pink",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps5-pink.webp",
  );

  await createSkin(
    variants.ps5Digital.id,
    "ps5-digital-purple",
    "Roxo Profundo",
    "Deep Purple",
    new Date("2022-09-15"),
    true,
    "Deep Purple",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps5-purple.webp",
  );

  await createSkin(
    variants.ps5Digital.id,
    "ps5-digital-blue",
    "Azul Cobalto",
    "Cobalt Blue",
    new Date("2022-09-15"),
    true,
    "Cobalt Blue",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps5-blue.webp",
  );

  // ========================
  // PlayStation 5 (Slim)
  // ========================
  await createSkin(
    variants.ps5Slim.id,
    "ps5-slim-white-black",
    "Branco e Preto",
    "White and Black",
    new Date("2023-11-10"),
    false,
    null,
    "Plástico ABS",
    "Fosco e Brilhante",
    "images/skins/sony/ps5-slim.webp",
  );

  await createSkin(
    variants.ps5Slim.id,
    "ps5-slim-volcanic-red",
    "Vermelho Vulcânico",
    "Volcanic Red",
    new Date("2024-02-01"),
    true,
    "Volcanic Red",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps5-slim-red.webp",
  );

  await createSkin(
    variants.ps5Slim.id,
    "ps5-slim-satin-silver",
    "Prata Cetim",
    "Satin Silver",
    new Date("2024-02-01"),
    true,
    "Satin Silver",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sony/ps5-slim-silver.webp",
  );

  // ========================
  // PlayStation 5 (Pro)
  // ========================
  await createSkin(
    variants.ps5Pro.id,
    "ps5-pro-black",
    "Preto Profundo",
    "Deep Black",
    new Date("2024-11-10"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sony/ps5-pro-black.webp",
  );

  await createSkin(
    variants.ps5Pro.id,
    "ps5-pro-gold-trim",
    "Preto com Dourado",
    "Black with Gold Trim",
    new Date("2024-11-10"),
    true,
    "Premium Edition",
    "Plástico ABS",
    "Fosco com detalhes brilhantes",
    "images/skins/sony/ps5-pro-gold.webp",
  );

  // ========================
  // Xbox Original
  // ========================
  await createSkin(
    variants.xboxFat.id,
    "xbox-black",
    "Preto",
    "Black",
    new Date("2001-11-15"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox-black.webp",
  );

  await createSkin(
    variants.xboxFat.id,
    "xbox-crystal",
    "Cristal",
    "Crystal",
    new Date("2003-11-01"),
    true,
    "Crystal Edition",
    "Plástico translúcido",
    "Brilhante",
    "images/skins/microsoft/xbox-crystal.webp",
  );

  await createSkin(
    variants.xboxFat.id,
    "xbox-halo-green",
    "Verde Halo",
    "Halo Green",
    new Date("2004-11-09"),
    true,
    "Halo 2 Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox-halo2.webp",
  );

  // ========================
  // Xbox 360 (Fat)
  // ========================
  await createSkin(
    variants.xbox360Fat.id,
    "xbox360-white",
    "Branco",
    "White",
    new Date("2005-11-22"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/microsoft/xbox360-white.webp",
  );

  await createSkin(
    variants.xbox360Fat.id,
    "xbox360-elite",
    "Preto Elite",
    "Elite Black",
    new Date("2007-04-29"),
    true,
    "Elite Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox360-elite.webp",
  );

  await createSkin(
    variants.xbox360Fat.id,
    "xbox360-halo3",
    "Halo 3 Edition",
    "Halo 3 Edition",
    new Date("2007-09-25"),
    true,
    "Halo 3 Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox360-halo3.webp",
  );

  await createSkin(
    variants.xbox360Fat.id,
    "xbox360-red-ring",
    "Vermelho",
    "Red",
    new Date("2008-10-01"),
    true,
    "Red Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/microsoft/xbox360-red.webp",
  );

  // ========================
  // Xbox 360 (Slim)
  // ========================
  await createSkin(
    variants.xbox360Slim.id,
    "xbox360s-black",
    "Preto Fosco",
    "Matte Black",
    new Date("2010-06-14"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox360s-black.webp",
  );

  await createSkin(
    variants.xbox360Slim.id,
    "xbox360s-halo4",
    "Halo 4 Edition",
    "Halo 4 Edition",
    new Date("2012-11-06"),
    true,
    "Halo 4 Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox360-halo4.webp",
  );

  await createSkin(
    variants.xbox360Slim.id,
    "xbox360s-glow",
    "Brilho Azul",
    "Glow Blue",
    new Date("2011-10-01"),
    true,
    "Glow Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/microsoft/xbox360-glow.webp",
  );

  await createSkin(
    variants.xbox360Slim.id,
    "xbox360s-gold",
    "Dourado",
    "Gold",
    new Date("2013-01-01"),
    true,
    "Gold Limited",
    "Plástico ABS com revestimento metálico",
    "Brilhante",
    "images/skins/microsoft/xbox360-gold.webp",
  );

  // ========================
  // Xbox 360 (E)
  // ========================
  await createSkin(
    variants.xbox360E.id,
    "xbox360e-black",
    "Preto",
    "Black",
    new Date("2013-06-10"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox360e-black.webp",
  );

  await createSkin(
    variants.xbox360E.id,
    "xbox360e-white",
    "Branco",
    "White",
    new Date("2013-09-01"),
    true,
    "White Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox360e-white.webp",
  );

  // ========================
  // Xbox One (Fat)
  // ========================
  await createSkin(
    variants.xboxOneFat.id,
    "xboxone-black",
    "Preto Fosco",
    "Matte Black",
    new Date("2013-11-22"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxone-black.webp",
  );

  await createSkin(
    variants.xboxOneFat.id,
    "xboxone-sunset",
    "Pôr do Sol",
    "Sunset Overdrive",
    new Date("2014-10-28"),
    true,
    "Sunset Overdrive Bundle",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxone-sunset.webp",
  );

  await createSkin(
    variants.xboxOneFat.id,
    "xboxone-mcfarlane",
    "Edição McFarlane",
    "McFarlane Edition",
    new Date("2015-02-20"),
    true,
    "Advanced Warfare Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxone-mcfarlane.webp",
  );

  // ========================
  // Xbox One S
  // ========================
  await createSkin(
    variants.xboxOneS.id,
    "xboxones-white",
    "Branco",
    "White",
    new Date("2016-08-02"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxones-white.webp",
  );

  await createSkin(
    variants.xboxOneS.id,
    "xboxones-battlefield",
    "Battlefield 1",
    "Battlefield 1",
    new Date("2016-10-21"),
    true,
    "Battlefield 1 Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxones-bf1.webp",
  );

  await createSkin(
    variants.xboxOneS.id,
    "xboxones-gears",
    "Gears of War 4",
    "Gears of War 4",
    new Date("2016-10-11"),
    true,
    "Gears of War 4 Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxones-gears.webp",
  );

  await createSkin(
    variants.xboxOneS.id,
    "xboxones-project-scorpio",
    "Projeto Scorpio",
    "Project Scorpio",
    new Date("2017-11-07"),
    true,
    "Project Scorpio Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxones-scorpio.webp",
  );

  // ========================
  // Xbox One X
  // ========================
  await createSkin(
    variants.xboxOneX.id,
    "xboxonex-black",
    "Preto",
    "Black",
    new Date("2017-11-07"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxonex-black.webp",
  );

  await createSkin(
    variants.xboxOneX.id,
    "xboxonex-cyberpunk",
    "Cyberpunk 2077",
    "Cyberpunk 2077",
    new Date("2020-06-01"),
    true,
    "Cyberpunk 2077 Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxonex-cyberpunk.webp",
  );

  await createSkin(
    variants.xboxOneX.id,
    "xboxonex-fallout",
    "Fallout 76",
    "Fallout 76",
    new Date("2018-11-14"),
    true,
    "Fallout 76 Bundle",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxonex-fallout.webp",
  );

  // ========================
  // Xbox Series X
  // ========================
  await createSkin(
    variants.xboxSeriesX.id,
    "xboxsx-black",
    "Preto",
    "Black",
    new Date("2020-11-10"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxsx-black.webp",
  );

  await createSkin(
    variants.xboxSeriesX.id,
    "xboxsx-halo-infinite",
    "Halo Infinite",
    "Halo Infinite",
    new Date("2021-11-15"),
    true,
    "Halo Infinite Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxsx-halo.webp",
  );

  await createSkin(
    variants.xboxSeriesX.id,
    "xboxsx-forza",
    "Forza Horizon 5",
    "Forza Horizon 5",
    new Date("2021-11-05"),
    true,
    "Forza Horizon 5 Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxsx-forza.webp",
  );

  await createSkin(
    variants.xboxSeriesX.id,
    "xboxsx-stellar-shift",
    "Deslocamento Estelar",
    "Stellar Shift",
    new Date("2023-03-01"),
    true,
    "Stellar Shift Special Edition",
    "Plástico ABS",
    "Gradiente",
    "images/skins/microsoft/xboxsx-stellar.webp",
  );

  // ========================
  // Xbox Series S
  // ========================
  await createSkin(
    variants.xboxSeriesS.id,
    "xboxss-white",
    "Branco",
    "White",
    new Date("2020-11-10"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxss-white.webp",
  );

  await createSkin(
    variants.xboxSeriesS.id,
    "xboxss-carbon-black",
    "Preto Carbono",
    "Carbon Black",
    new Date("2023-09-01"),
    true,
    "Carbon Black Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxss-black.webp",
  );

  await createSkin(
    variants.xboxSeriesS.id,
    "xboxss-volt-green",
    "Verde Volts",
    "Volt Green",
    new Date("2021-11-15"),
    true,
    "Electric Volt",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxss-green.webp",
  );

  await createSkin(
    variants.xboxSeriesS.id,
    "xboxss-robot-white",
    "Branco Robótico",
    "Robot White",
    new Date("2022-08-30"),
    true,
    "Robot White Special",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxss-robot.webp",
  );

  // ========================
  // Edições Especiais e Limitadas Adicionais
  // ========================

  // Xbox 360 - Edições Raras
  await createSkin(
    variants.xbox360Fat.id,
    "xbox360-star-wars",
    "Star Wars",
    "Star Wars",
    new Date("2012-10-30"),
    true,
    "Star Wars Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox360-starwars.webp",
  );

  await createSkin(
    variants.xbox360Slim.id,
    "xbox360s-call-of-duty",
    "Call of Duty",
    "Call of Duty",
    new Date("2011-11-08"),
    true,
    "Modern Warfare 3 Bundle",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xbox360-cod.webp",
  );

  // Xbox One - Edições Especiais
  await createSkin(
    variants.xboxOneS.id,
    "xboxones-sea-of-thieves",
    "Sea of Thieves",
    "Sea of Thieves",
    new Date("2018-03-20"),
    true,
    "Sea of Thieves Limited",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxones-sea.webp",
  );

  await createSkin(
    variants.xboxOneX.id,
    "xboxonex-taco-bell",
    "Taco Bell",
    "Taco Bell",
    new Date("2019-11-01"),
    true,
    "Taco Bell Contest Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/microsoft/xboxonex-tacobell.webp",
  );

  // Xbox Series X|S - Edições Atuais
  await createSkin(
    variants.xboxSeriesX.id,
    "xboxsx-diablo",
    "Diablo IV",
    "Diablo IV",
    new Date("2023-05-15"),
    true,
    "Diablo IV Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxsx-diablo.webp",
  );

  await createSkin(
    variants.xboxSeriesS.id,
    "xboxss-golden-ridge",
    "Crista Dourada",
    "Golden Ridge",
    new Date("2023-11-01"),
    true,
    "Golden Ridge Special",
    "Plástico ABS",
    "Fosco",
    "images/skins/microsoft/xboxss-golden.webp",
  );

  // ========================
  // Nintendo Entertainment System (NES)
  // ========================
  await createSkin(
    variants.nesFrontLoader.id,
    "nes-front-gray",
    "Cinza",
    "Gray",
    new Date("1985-07-15"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/nes-gray.webp",
  );

  await createSkin(
    variants.nesFrontLoader.id,
    "nes-front-famicom",
    "Famicom Vermelho",
    "Famicom Red",
    new Date("1983-07-15"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/famicom-red.webp",
  );

  await createSkin(
    variants.nesTopLoader.id,
    "nes-top-gray",
    "Cinza",
    "Gray",
    new Date("1993-06-01"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/nes-top-gray.webp",
  );

  // ========================
  // Game Boy (Original)
  // ========================
  await createSkin(
    variants.gameBoyOriginal.id,
    "gb-gray",
    "Cinza",
    "Gray",
    new Date("1989-04-21"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/gb-gray.webp",
  );

  await createSkin(
    variants.gameBoyOriginal.id,
    "gb-play-it-loud-black",
    "Preto Play It Loud",
    "Play It Loud Black",
    new Date("1995-03-01"),
    true,
    "Play It Loud Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gb-black.webp",
  );

  await createSkin(
    variants.gameBoyOriginal.id,
    "gb-play-it-loud-red",
    "Vermelho Play It Loud",
    "Play It Loud Red",
    new Date("1995-03-01"),
    true,
    "Play It Loud Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gb-red.webp",
  );

  await createSkin(
    variants.gameBoyOriginal.id,
    "gb-play-it-loud-yellow",
    "Amarelo Play It Loud",
    "Play It Loud Yellow",
    new Date("1995-03-01"),
    true,
    "Play It Loud Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gb-yellow.webp",
  );

  await createSkin(
    variants.gameBoyOriginal.id,
    "gb-play-it-loud-green",
    "Verde Play It Loud",
    "Play It Loud Green",
    new Date("1995-03-01"),
    true,
    "Play It Loud Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gb-green.webp",
  );

  await createSkin(
    variants.gameBoyOriginal.id,
    "gb-play-it-loud-blue",
    "Azul Play It Loud",
    "Play It Loud Blue",
    new Date("1995-03-01"),
    true,
    "Play It Loud Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gb-blue.webp",
  );

  await createSkin(
    variants.gameBoyOriginal.id,
    "gb-play-it-loud-clear",
    "Transparente Play It Loud",
    "Play It Loud Clear",
    new Date("1995-03-01"),
    true,
    "Play It Loud Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gb-clear.webp",
  );

  // ========================
  // Game Boy Pocket
  // ========================
  await createSkin(
    variants.gameBoyPocket.id,
    "gb-pocket-silver",
    "Prata",
    "Silver",
    new Date("1996-07-21"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/gbp-silver.webp",
  );

  await createSkin(
    variants.gameBoyPocket.id,
    "gb-pocket-red",
    "Vermelho",
    "Red",
    new Date("1996-12-01"),
    true,
    "Red Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbp-red.webp",
  );

  await createSkin(
    variants.gameBoyPocket.id,
    "gb-pocket-yellow",
    "Amarelo",
    "Yellow",
    new Date("1996-12-01"),
    true,
    "Yellow Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbp-yellow.webp",
  );

  await createSkin(
    variants.gameBoyPocket.id,
    "gb-pocket-green",
    "Verde",
    "Green",
    new Date("1996-12-01"),
    true,
    "Green Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbp-green.webp",
  );

  await createSkin(
    variants.gameBoyPocket.id,
    "gb-pocket-blue",
    "Azul",
    "Blue",
    new Date("1996-12-01"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbp-blue.webp",
  );

  // ========================
  // Game Boy Color
  // ========================
  await createSkin(
    variants.gameBoyColor.id,
    "gbc-purple",
    "Roxo",
    "Purple",
    new Date("1998-10-21"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbc-purple.webp",
  );

  await createSkin(
    variants.gameBoyColor.id,
    "gbc-teal",
    "Verde-azulado",
    "Teal",
    new Date("1998-10-21"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbc-teal.webp",
  );

  await createSkin(
    variants.gameBoyColor.id,
    "gbc-yellow",
    "Amarelo",
    "Yellow",
    new Date("1998-11-01"),
    true,
    "Pokémon Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbc-yellow.webp",
  );

  await createSkin(
    variants.gameBoyColor.id,
    "gbc-red",
    "Vermelho",
    "Red",
    new Date("1999-01-01"),
    true,
    "Red Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbc-red.webp",
  );

  await createSkin(
    variants.gameBoyColor.id,
    "gbc-green",
    "Verde",
    "Green",
    new Date("1999-01-01"),
    true,
    "Green Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbc-green.webp",
  );

  await createSkin(
    variants.gameBoyColor.id,
    "gbc-blue",
    "Azul",
    "Blue",
    new Date("1999-01-01"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbc-blue.webp",
  );

  await createSkin(
    variants.gameBoyColor.id,
    "gbc-pink",
    "Rosa",
    "Pink",
    new Date("1999-01-01"),
    true,
    "Pink Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbc-pink.webp",
  );

  await createSkin(
    variants.gameBoyColor.id,
    "gbc-gold",
    "Dourado",
    "Gold",
    new Date("1999-11-01"),
    true,
    "Zelda Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gbc-gold.webp",
  );

  // ========================
  // Super Nintendo (SNES)
  // ========================
  await createSkin(
    variants.snesOriginal.id,
    "snes-gray",
    "Cinza",
    "Gray",
    new Date("1990-08-23"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/snes-gray.webp",
  );

  await createSkin(
    variants.snesOriginal.id,
    "snes-super-famicom",
    "Super Famicom",
    "Super Famicom",
    new Date("1990-11-21"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/super-famicom.webp",
  );

  // ========================
  // Nintendo 64
  // ========================
  await createSkin(
    variants.n64Standard.id,
    "n64-gray",
    "Cinza",
    "Gray",
    new Date("1996-09-29"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/n64-gray.webp",
  );

  await createSkin(
    variants.n64Standard.id,
    "n64-black",
    "Preto",
    "Black",
    new Date("1997-01-01"),
    true,
    "Funtastic Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/n64-black.webp",
  );

  await createSkin(
    variants.n64Standard.id,
    "n64-green",
    "Verde",
    "Green",
    new Date("1997-11-01"),
    true,
    "Funtastic Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/n64-green.webp",
  );

  await createSkin(
    variants.n64Standard.id,
    "n64-blue",
    "Azul",
    "Blue",
    new Date("1997-11-01"),
    true,
    "Funtastic Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/n64-blue.webp",
  );

  await createSkin(
    variants.n64Standard.id,
    "n64-red",
    "Vermelho",
    "Red",
    new Date("1997-11-01"),
    true,
    "Funtastic Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/n64-red.webp",
  );

  await createSkin(
    variants.n64Standard.id,
    "n64-yellow",
    "Amarelo",
    "Yellow",
    new Date("1998-03-01"),
    true,
    "Funtastic Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/n64-yellow.webp",
  );

  await createSkin(
    variants.n64Standard.id,
    "n64-orange",
    "Laranja",
    "Orange",
    new Date("1998-03-01"),
    true,
    "Funtastic Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/n64-orange.webp",
  );

  await createSkin(
    variants.n64Standard.id,
    "n64-purple",
    "Roxo",
    "Purple",
    new Date("1999-05-01"),
    true,
    "Funtastic Series",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/n64-purple.webp",
  );

  await createSkin(
    variants.n64Standard.id,
    "n64-gold",
    "Dourado",
    "Gold",
    new Date("1998-11-01"),
    true,
    "Zelda Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/n64-gold.webp",
  );

  // ========================
  // GameCube
  // ========================
  await createSkin(
    variants.gameCubeStandard.id,
    "gc-purple",
    "Roxo",
    "Purple",
    new Date("2001-09-14"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gc-purple.webp",
  );

  await createSkin(
    variants.gameCubeStandard.id,
    "gc-black",
    "Preto",
    "Black",
    new Date("2002-05-01"),
    true,
    "Special Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gc-black.webp",
  );

  await createSkin(
    variants.gameCubeStandard.id,
    "gc-orange",
    "Laranja",
    "Orange",
    new Date("2002-11-01"),
    true,
    "Spice Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gc-orange.webp",
  );

  await createSkin(
    variants.gameCubeStandard.id,
    "gc-silver",
    "Prata",
    "Silver",
    new Date("2003-01-01"),
    true,
    "Platinum Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gc-silver.webp",
  );

  await createSkin(
    variants.gameCubeStandard.id,
    "gc-gold",
    "Dourado Zelda",
    "Zelda Gold",
    new Date("2003-03-24"),
    true,
    "Zelda Bundle",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/gc-gold.webp",
  );

  // ========================
  // Nintendo DS
  // ========================
  await createSkin(
    variants.dsOriginal.id,
    "ds-silver",
    "Prata",
    "Silver",
    new Date("2004-11-21"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/ds-silver.webp",
  );

  await createSkin(
    variants.dsOriginal.id,
    "ds-pink",
    "Rosa",
    "Pink",
    new Date("2005-03-24"),
    true,
    "Pink Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/ds-pink.webp",
  );

  await createSkin(
    variants.dsOriginal.id,
    "ds-blue",
    "Azul",
    "Blue",
    new Date("2005-03-24"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/ds-blue.webp",
  );

  // DS Lite
  await createSkin(
    variants.dsLite.id,
    "ds-lite-white",
    "Branco",
    "White",
    new Date("2006-03-02"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/dsl-white.webp",
  );

  await createSkin(
    variants.dsLite.id,
    "ds-lite-black",
    "Preto",
    "Black",
    new Date("2006-06-11"),
    true,
    "Black Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/dsl-black.webp",
  );

  await createSkin(
    variants.dsLite.id,
    "ds-lite-pink",
    "Rosa",
    "Pink",
    new Date("2006-09-02"),
    true,
    "Pink Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/dsl-pink.webp",
  );

  await createSkin(
    variants.dsLite.id,
    "ds-lite-blue",
    "Azul",
    "Blue",
    new Date("2006-10-01"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/dsl-blue.webp",
  );

  await createSkin(
    variants.dsLite.id,
    "ds-lite-red",
    "Vermelho",
    "Red",
    new Date("2007-01-01"),
    true,
    "Red Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/dsl-red.webp",
  );

  await createSkin(
    variants.dsLite.id,
    "ds-lite-gold",
    "Dourado",
    "Gold",
    new Date("2007-06-03"),
    true,
    "Zelda Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/dsl-gold.webp",
  );

  // ========================
  // Wii
  // ========================
  await createSkin(
    variants.wiiOriginal.id,
    "wii-white",
    "Branco",
    "White",
    new Date("2006-11-19"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/wii-white.webp",
  );

  await createSkin(
    variants.wiiOriginal.id,
    "wii-black",
    "Preto",
    "Black",
    new Date("2009-08-01"),
    true,
    "Black Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/wii-black.webp",
  );

  await createSkin(
    variants.wiiOriginal.id,
    "wii-red",
    "Vermelho",
    "Red",
    new Date("2010-11-07"),
    true,
    "Mario Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/wii-red.webp",
  );

  await createSkin(
    variants.wiiOriginal.id,
    "wii-blue",
    "Azul",
    "Blue",
    new Date("2011-11-06"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/wii-blue.webp",
  );

  // ========================
  // Nintendo 3DS
  // ========================
  // 3DS Original
  await createSkin(
    variants.threeDSOriginal.id,
    "3ds-aqua",
    "Verde-azulado",
    "Aqua Blue",
    new Date("2011-02-26"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/3ds-aqua.webp",
  );

  await createSkin(
    variants.threeDSOriginal.id,
    "3ds-cosmo",
    "Preto Cósmico",
    "Cosmo Black",
    new Date("2011-02-26"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/3ds-black.webp",
  );

  await createSkin(
    variants.threeDSOriginal.id,
    "3ds-flame",
    "Vermelho Flamejante",
    "Flame Red",
    new Date("2011-08-01"),
    true,
    "Red Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/3ds-red.webp",
  );

  // 3DS XL
  await createSkin(
    variants.threeDSXL.id,
    "3ds-xl-blue",
    "Azul",
    "Blue",
    new Date("2012-07-28"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/3ds-xl-blue.webp",
  );

  await createSkin(
    variants.threeDSXL.id,
    "3ds-xl-red",
    "Vermelho",
    "Red",
    new Date("2012-07-28"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/3ds-xl-red.webp",
  );

  await createSkin(
    variants.threeDSXL.id,
    "3ds-xl-pink",
    "Rosa",
    "Pink",
    new Date("2013-01-01"),
    true,
    "Pink Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/3ds-xl-pink.webp",
  );

  await createSkin(
    variants.threeDSXL.id,
    "3ds-xl-gold",
    "Dourado Zelda",
    "Zelda Gold",
    new Date("2013-11-22"),
    true,
    "Zelda Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/3ds-xl-gold.webp",
  );

  // ========================
  // Wii U
  // ========================
  // Basic
  await createSkin(
    variants.wiiUBasic.id,
    "wiiu-basic-white",
    "Branco",
    "White",
    new Date("2012-11-18"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/wiiu-basic-white.webp",
  );

  // Deluxe
  await createSkin(
    variants.wiiUDeluxe.id,
    "wiiu-deluxe-black",
    "Preto",
    "Black",
    new Date("2012-11-18"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/wiiu-deluxe-black.webp",
  );

  await createSkin(
    variants.wiiUDeluxe.id,
    "wiiu-deluxe-zelda",
    "Zelda Wind Waker",
    "Zelda Wind Waker",
    new Date("2013-09-20"),
    true,
    "Zelda Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/nintendo/wiiu-zelda.webp",
  );

  // ========================
  // Nintendo Switch
  // ========================
  // Standard
  await createSkin(
    variants.switchStandard.id,
    "switch-neon",
    "Neon",
    "Neon",
    new Date("2017-03-03"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-neon.webp",
  );

  await createSkin(
    variants.switchStandard.id,
    "switch-gray",
    "Cinza",
    "Gray",
    new Date("2017-03-03"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-gray.webp",
  );

  await createSkin(
    variants.switchStandard.id,
    "switch-animal-crossing",
    "Animal Crossing",
    "Animal Crossing",
    new Date("2020-03-13"),
    true,
    "Animal Crossing Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-ac.webp",
  );

  await createSkin(
    variants.switchStandard.id,
    "switch-mario-red",
    "Vermelho Mario",
    "Mario Red",
    new Date("2020-10-16"),
    true,
    "Mario Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-mario-red.webp",
  );

  // OLED
  await createSkin(
    variants.switchOLED.id,
    "switch-oled-white",
    "Branco",
    "White",
    new Date("2021-10-08"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-oled-white.webp",
  );

  await createSkin(
    variants.switchOLED.id,
    "switch-oled-splatoon3",
    "Splatoon 3",
    "Splatoon 3",
    new Date("2022-08-26"),
    true,
    "Splatoon 3 Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-oled-splatoon.webp",
  );

  await createSkin(
    variants.switchOLED.id,
    "switch-oled-zelda",
    "Zelda Tears",
    "Zelda Tears",
    new Date("2023-04-28"),
    true,
    "Zelda Tears of the Kingdom",
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-oled-zelda.webp",
  );

  // Lite
  await createSkin(
    variants.switchLite.id,
    "switch-lite-turquoise",
    "Turquesa",
    "Turquoise",
    new Date("2019-09-20"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-lite-turquoise.webp",
  );

  await createSkin(
    variants.switchLite.id,
    "switch-lite-coral",
    "Coral",
    "Coral",
    new Date("2020-04-03"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-lite-coral.webp",
  );

  await createSkin(
    variants.switchLite.id,
    "switch-lite-yellow",
    "Amarelo",
    "Yellow",
    new Date("2019-09-20"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-lite-yellow.webp",
  );

  await createSkin(
    variants.switchLite.id,
    "switch-lite-gray",
    "Cinza",
    "Gray",
    new Date("2019-09-20"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-lite-gray.webp",
  );

  await createSkin(
    variants.switchLite.id,
    "switch-lite-blue",
    "Azul",
    "Blue",
    new Date("2021-05-21"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-lite-blue.webp",
  );

  await createSkin(
    variants.switchLite.id,
    "switch-lite-pink",
    "Rosa",
    "Pink",
    new Date("2021-05-21"),
    true,
    "Pink Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-lite-pink.webp",
  );

  await createSkin(
    variants.switchLite.id,
    "switch-lite-pokemon",
    "Pokémon",
    "Pokémon",
    new Date("2021-11-05"),
    true,
    "Pokémon Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/nintendo/switch-lite-pokemon.webp",
  );

  // ========================
  // Sega Master System
  // ========================
  // Modelo Original
  await createSkin(
    variants.masterSystemOriginal.id,
    "mastersystem-black",
    "Preto",
    "Black",
    new Date("1985-10-20"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/mastersystem-black.webp",
  );

  await createSkin(
    variants.masterSystemOriginal.id,
    "mastersystem-gold",
    "Dourado",
    "Gold",
    new Date("1986-09-01"),
    true,
    "Gold Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/mastersystem-gold.webp",
  );

  // Master System II
  await createSkin(
    variants.masterSystemII.id,
    "mastersystem2-white",
    "Branco",
    "White",
    new Date("1990-01-01"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/mastersystem2-white.webp",
  );

  await createSkin(
    variants.masterSystemII.id,
    "mastersystem2-red",
    "Vermelho",
    "Red",
    new Date("1991-06-01"),
    true,
    "Red Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/mastersystem2-red.webp",
  );

  await createSkin(
    variants.masterSystemII.id,
    "mastersystem2-blue",
    "Azul",
    "Blue",
    new Date("1991-06-01"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/mastersystem2-blue.webp",
  );

  // ========================
  // Sega Mega Drive/Genesis
  // ========================
  // Modelo 1
  await createSkin(
    variants.megaDriveModel1.id,
    "megadrive1-black",
    "Preto",
    "Black",
    new Date("1988-10-29"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/megadrive1-black.webp",
  );

  await createSkin(
    variants.megaDriveModel1.id,
    "megadrive1-altered-beast",
    "Altered Beast",
    "Altered Beast",
    new Date("1989-08-14"),
    true,
    "Altered Beast Bundle",
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/megadrive-alteredbeast.webp",
  );

  // Modelo 2
  await createSkin(
    variants.megaDriveModel2.id,
    "megadrive2-black",
    "Preto",
    "Black",
    new Date("1993-01-01"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/megadrive2-black.webp",
  );

  await createSkin(
    variants.megaDriveModel2.id,
    "megadrive2-sonic2",
    "Sonic 2",
    "Sonic 2",
    new Date("1992-11-24"),
    true,
    "Sonic 2 Bundle",
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/megadrive-sonic2.webp",
  );

  await createSkin(
    variants.megaDriveModel2.id,
    "megadrive2-sports",
    "Sports",
    "Sports",
    new Date("1994-03-01"),
    true,
    "Sports Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/megadrive-sports.webp",
  );

  // Edições especiais
  await createSkin(
    variants.megaDriveModel2.id,
    "megadrive2-gold",
    "Dourado",
    "Gold",
    new Date("1994-11-01"),
    true,
    "Golden Edition",
    "Plástico ABS com revestimento",
    "Brilhante",
    "images/skins/sega/megadrive-gold.webp",
  );

  await createSkin(
    variants.megaDriveModel2.id,
    "megadrive2-sonic",
    "Sonic The Hedgehog",
    "Sonic The Hedgehog",
    new Date("1993-12-01"),
    true,
    "Sonic Special",
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/megadrive-sonic.webp",
  );

  // ========================
  // Sega Saturn
  // ========================
  // Modelo 1
  await createSkin(
    variants.saturnModel1.id,
    "saturn1-gray",
    "Cinza",
    "Gray",
    new Date("1994-11-22"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/saturn1-gray.webp",
  );

  await createSkin(
    variants.saturnModel1.id,
    "saturn1-virtua-fighter",
    "Virtua Fighter",
    "Virtua Fighter",
    new Date("1995-05-01"),
    true,
    "Virtua Fighter Bundle",
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/saturn-virtuafighter.webp",
  );

  // Modelo 2
  await createSkin(
    variants.saturnModel2.id,
    "saturn2-white",
    "Branco",
    "White",
    new Date("1996-01-01"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/saturn2-white.webp",
  );

  await createSkin(
    variants.saturnModel2.id,
    "saturn2-black",
    "Preto",
    "Black",
    new Date("1996-06-01"),
    true,
    "Black Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/saturn2-black.webp",
  );

  await createSkin(
    variants.saturnModel2.id,
    "saturn2-nights",
    "Nights into Dreams",
    "Nights into Dreams",
    new Date("1996-07-05"),
    true,
    "Nights Bundle",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/saturn-nights.webp",
  );

  // Edições japonesas
  await createSkin(
    variants.saturnModel2.id,
    "saturn2-vampire",
    "Vampire Savior",
    "Vampire Savior",
    new Date("1997-05-01"),
    true,
    "Vampire Savior Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/saturn-vampire.webp",
  );

  // ========================
  // Sega Dreamcast
  // ========================
  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-white",
    "Branco",
    "White",
    new Date("1999-11-27"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-white.webp",
  );

  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-black",
    "Preto",
    "Black",
    new Date("2000-09-09"),
    true,
    "Black Sports Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-black.webp",
  );

  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-blue",
    "Azul",
    "Blue",
    new Date("2000-12-01"),
    true,
    "Sega Sports Blue",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-blue.webp",
  );

  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-red",
    "Vermelho",
    "Red",
    new Date("2000-12-01"),
    true,
    "Sega Sports Red",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-red.webp",
  );

  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-yellow",
    "Amarelo",
    "Yellow",
    new Date("2000-12-01"),
    true,
    "Hello Kitty Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-yellow.webp",
  );

  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-green",
    "Verde",
    "Green",
    new Date("2001-03-01"),
    true,
    "Sakura Taisen Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-green.webp",
  );

  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-sonic",
    "Sonic Adventure",
    "Sonic Adventure",
    new Date("1999-12-23"),
    true,
    "Sonic Adventure Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-sonic.webp",
  );

  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-seaman",
    "Seaman",
    "Seaman",
    new Date("2000-07-20"),
    true,
    "Seaman Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-seaman.webp",
  );

  // Edições especiais
  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-millennium",
    "Edição do Milênio",
    "Millennium Edition",
    new Date("2000-01-01"),
    true,
    "Millennium Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-millennium.webp",
  );

  await createSkin(
    variants.dreamcastStandard.id,
    "dreamcast-transparent",
    "Transparente",
    "Clear",
    new Date("2000-09-01"),
    true,
    "Clear Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/sega/dreamcast-clear.webp",
  );

  // ========================
  // Outros consoles Sega
  // ========================
  // Sega CD (Acessório, mas vamos considerar como skin do Mega Drive)
  await createSkin(
    variants.megaDriveModel2.id,
    "segacd-black",
    "Sega CD Preto",
    "Sega CD Black",
    new Date("1992-12-12"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/segacd-black.webp",
  );

  // Sega 32X (Acessório)
  await createSkin(
    variants.megaDriveModel2.id,
    "32x-black",
    "32X Preto",
    "32X Black",
    new Date("1994-12-03"),
    false,
    null,
    "Plástico ABS",
    "Fosco",
    "images/skins/sega/32x-black.webp",
  );

  // ========================
  // Atari 2600 (Heavy Sixer)
  // ========================
  await createSkin(
    variants.atari2600Heavy.id,
    "atari2600-heavy-woodgrain",
    "Madeira",
    "Woodgrain",
    new Date("1977-09-11"),
    false,
    null,
    "Madeira plástica",
    "Texturizado",
    "images/skins/atari/2600-heavy-woodgrain.webp",
  );

  await createSkin(
    variants.atari2600Heavy.id,
    "atari2600-heavy-all-black",
    "Preto Total",
    "All Black",
    new Date("1978-06-01"),
    true,
    "Special Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/atari/2600-heavy-black.webp",
  );

  // ========================
  // Atari 2600 (Light Sixer)
  // ========================
  await createSkin(
    variants.atari2600Light.id,
    "atari2600-light-woodgrain",
    "Madeira",
    "Woodgrain",
    new Date("1978-01-01"),
    false,
    null,
    "Madeira plástica",
    "Texturizado",
    "images/skins/atari/2600-light-woodgrain.webp",
  );

  await createSkin(
    variants.atari2600Light.id,
    "atari2600-light-silver",
    "Prata",
    "Silver",
    new Date("1979-03-01"),
    true,
    "Silver Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/2600-light-silver.webp",
  );

  // ========================
  // Atari 2600 (4-Switch)
  // ========================
  await createSkin(
    variants.atari26004Switch.id,
    "atari2600-4switch-woodgrain",
    "Madeira",
    "Woodgrain",
    new Date("1980-01-01"),
    false,
    null,
    "Madeira plástica",
    "Texturizado",
    "images/skins/atari/2600-4switch-woodgrain.webp",
  );

  await createSkin(
    variants.atari26004Switch.id,
    "atari2600-4switch-black",
    "Preto",
    "Black",
    new Date("1982-01-01"),
    true,
    "Darth Vader Edition",
    "Plástico ABS",
    "Fosco",
    "images/skins/atari/2600-4switch-black.webp",
  );

  await createSkin(
    variants.atari26004Switch.id,
    "atari2600-4switch-gold",
    "Dourado",
    "Gold",
    new Date("1981-10-01"),
    true,
    "Gold Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/2600-4switch-gold.webp",
  );

  // ========================
  // Atari 2600 (Junior)
  // ========================
  await createSkin(
    variants.atari2600Junior.id,
    "atari2600-jr-black",
    "Preto",
    "Black",
    new Date("1986-01-01"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/2600-jr-black.webp",
  );

  await createSkin(
    variants.atari2600Junior.id,
    "atari2600-jr-silver",
    "Prata",
    "Silver",
    new Date("1986-06-01"),
    true,
    "Silver Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/2600-jr-silver.webp",
  );

  await createSkin(
    variants.atari2600Junior.id,
    "atari2600-jr-red",
    "Vermelho",
    "Red",
    new Date("1987-01-01"),
    true,
    "Red Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/2600-jr-red.webp",
  );

  await createSkin(
    variants.atari2600Junior.id,
    "atari2600-jr-blue",
    "Azul",
    "Blue",
    new Date("1987-01-01"),
    true,
    "Blue Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/2600-jr-blue.webp",
  );

  // ========================
  // Atari 7800
  // ========================
  await createSkin(
    variants.atari7800Standard.id,
    "atari7800-black",
    "Preto",
    "Black",
    new Date("1986-05-01"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/7800-black.webp",
  );

  await createSkin(
    variants.atari7800Standard.id,
    "atari7800-silver",
    "Prata",
    "Silver",
    new Date("1987-01-01"),
    true,
    "Silver Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/7800-silver.webp",
  );

  await createSkin(
    variants.atari7800Standard.id,
    "atari7800-gold",
    "Dourado",
    "Gold",
    new Date("1988-01-01"),
    true,
    "Gold Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/7800-gold.webp",
  );

  // ========================
  // Edições Especiais e Promocionais
  // ========================

  // Atari 2600 Edições Temáticas
  await createSkin(
    variants.atari26004Switch.id,
    "atari2600-pacman",
    "Pac-Man",
    "Pac-Man",
    new Date("1982-03-01"),
    true,
    "Pac-Man Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/2600-pacman.webp",
  );

  await createSkin(
    variants.atari26004Switch.id,
    "atari2600-space-invaders",
    "Space Invaders",
    "Space Invaders",
    new Date("1980-01-01"),
    true,
    "Space Invaders Limited",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/2600-spaceinvaders.webp",
  );

  // Atari 2600 Edições de Retailers
  await createSkin(
    variants.atari26004Switch.id,
    "atari2600-sears-telegames",
    "Sears TeleGames",
    "Sears TeleGames",
    new Date("1979-01-01"),
    true,
    "Sears Exclusive",
    "Madeira plástica",
    "Texturizado",
    "images/skins/atari/2600-sears.webp",
  );

  // Atari 7800 Edições Especiais
  await createSkin(
    variants.atari7800Standard.id,
    "atari7800-xe",
    "XE Game System",
    "XE Game System",
    new Date("1987-01-01"),
    true,
    "XE Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/7800-xe.webp",
  );

  await createSkin(
    variants.atari5200Standard.id,
    "atari5200-black",
    "Preto",
    "Black",
    new Date("1982-11-01"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/5200-black.webp",
  );

  await createSkin(
    variants.atari5200Standard.id,
    "atari5200-four-port",
    "4 Portas",
    "4-Port Model",
    new Date("1982-11-01"),
    false,
    null,
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/5200-4port.webp",
  );

  await createSkin(
    variants.atari5200Standard.id,
    "atari5200-two-port",
    "2 Portas",
    "2-Port Model",
    new Date("1983-01-01"),
    true,
    "Revised Edition",
    "Plástico ABS",
    "Brilhante",
    "images/skins/atari/5200-2port.webp",
  );
}

// Executar a função
createSkins()
  .then(() => console.log("Skins Sony criadas com sucesso!"))
  .catch((e) => console.error("Erro ao criar skins Sony:", e));
