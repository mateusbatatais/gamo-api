import { PrismaClient } from "@prisma/client";
import { createBrands } from "./brandSeed";

const db = new PrismaClient();

export async function createConsoles() {
  const { microsoft, nintendo, sega, atari, sony } = await createBrands();

  // Consoles Sony
  const ps1 = await db.console.upsert({
    where: { slug: "playstation-1" },
    update: {},
    create: {
      slug: "playstation-1",
      nickname: "ps1",
      brandId: sony.id,
      releaseDate: new Date("1994-12-03"),
      generation: 5,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "PlayStation 1", description: "Console de 5ª geração da Sony." },
          { locale: "en", name: "PlayStation 1", description: "Sony's 5th generation console." },
        ],
      },
    },
  });

  const ps2 = await db.console.upsert({
    where: { slug: "playstation-2" },
    update: {},
    create: {
      slug: "playstation-2",
      nickname: "ps2",
      brandId: sony.id,
      releaseDate: new Date("2000-10-26"),
      generation: 6,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "PlayStation 2", description: "Console de 6ª geração da Sony." },
          { locale: "en", name: "PlayStation 2", description: "Sony's 6th generation console." },
        ],
      },
    },
  });

  const psp = await db.console.upsert({
    where: { slug: "psp" },
    update: {},
    create: {
      slug: "psp",
      nickname: "psp",
      brandId: sony.id,
      releaseDate: new Date("2004-12-12"),
      generation: 7,
      type: "handheld",
      translations: {
        create: [
          { locale: "pt", name: "PSP", description: "Portátil de 7ª geração da Sony." },
          { locale: "en", name: "PSP", description: "Sony's 7th generation handheld." },
        ],
      },
    },
  });

  const ps3 = await db.console.upsert({
    where: { slug: "playstation-3" },
    update: {},
    create: {
      slug: "playstation-3",
      nickname: "ps3",
      brandId: sony.id,
      releaseDate: new Date("2006-11-17"),
      generation: 7,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "PlayStation 3", description: "Console de 7ª geração da Sony." },
          { locale: "en", name: "PlayStation 3", description: "Sony's 7th generation console." },
        ],
      },
    },
  });

  const psVita = await db.console.upsert({
    where: { slug: "ps-vita" },
    update: {},
    create: {
      slug: "ps-vita",
      nickname: "vita",
      brandId: sony.id,
      releaseDate: new Date("2011-12-17"),
      generation: 8,
      type: "handheld",
      translations: {
        create: [
          { locale: "pt", name: "PS Vita", description: "Portátil de 8ª geração da Sony." },
          { locale: "en", name: "PS Vita", description: "Sony's 8th generation handheld." },
        ],
      },
    },
  });

  const ps4 = await db.console.upsert({
    where: { slug: "playstation-4" },
    update: {},
    create: {
      slug: "playstation-4",
      nickname: "ps4",
      brandId: sony.id,
      releaseDate: new Date("2013-11-15"),
      generation: 8, // Correção: 8ª geração
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "PlayStation 4", description: "Console de 8ª geração da Sony." },
          { locale: "en", name: "PlayStation 4", description: "Sony's 8th generation console." },
        ],
      },
    },
  });

  const ps5 = await db.console.upsert({
    where: { slug: "playstation-5" },
    update: {},
    create: {
      slug: "playstation-5",
      nickname: "ps5",
      brandId: sony.id,
      releaseDate: new Date("2020-11-12"),
      generation: 9,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "PlayStation 5", description: "Console de 9ª geração da Sony." },
          { locale: "en", name: "PlayStation 5", description: "Sony's 9th generation console." },
        ],
      },
    },
  });

  // Consoles Microsoft
  const xbox = await db.console.upsert({
    where: { slug: "xbox" },
    update: {},
    create: {
      slug: "xbox",
      nickname: "xbox",
      brandId: microsoft.id,
      releaseDate: new Date("2001-11-15"),
      generation: 6,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Xbox", description: "Console de 6ª geração da Microsoft." },
          { locale: "en", name: "Xbox", description: "Microsoft's 6th generation console." },
        ],
      },
    },
  });

  const xbox360 = await db.console.upsert({
    where: { slug: "xbox-360" },
    update: {},
    create: {
      slug: "xbox-360",
      nickname: "xbox360",
      brandId: microsoft.id,
      releaseDate: new Date("2005-11-22"),
      generation: 7,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Xbox 360", description: "Console de 7ª geração da Microsoft." },
          { locale: "en", name: "Xbox 360", description: "Microsoft's 7th generation console." },
        ],
      },
    },
  });

  const xboxOne = await db.console.upsert({
    where: { slug: "xbox-one" },
    update: {},
    create: {
      slug: "xbox-one",
      nickname: "xboxone",
      brandId: microsoft.id,
      releaseDate: new Date("2013-11-22"),
      generation: 8, // Correção: 8ª geração
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Xbox One", description: "Console de 8ª geração da Microsoft." },
          { locale: "en", name: "Xbox One", description: "Microsoft's 8th generation console." },
        ],
      },
    },
  });

  const xboxSeriesX = await db.console.upsert({
    where: { slug: "xbox-series-x" },
    update: {},
    create: {
      slug: "xbox-series-x",
      nickname: "xboxx",
      brandId: microsoft.id,
      releaseDate: new Date("2020-11-10"),
      generation: 9,
      type: "desktop",
      translations: {
        create: [
          {
            locale: "pt",
            name: "Xbox Série X",
            description: "Console de 9ª geração da Microsoft.",
          },
          {
            locale: "en",
            name: "Xbox Series X",
            description: "Microsoft's 9th generation console.",
          },
        ],
      },
    },
  });

  const xboxSeriesS = await db.console.upsert({
    where: { slug: "xbox-series-s" },
    update: {},
    create: {
      slug: "xbox-series-s",
      nickname: "xboxseriesS",
      brandId: microsoft.id,
      releaseDate: new Date("2020-11-10"),
      generation: 9,
      type: "desktop",
      translations: {
        create: [
          {
            locale: "pt",
            name: "Xbox Série S",
            description: "Console de 9ª geração da Microsoft.",
          },
          {
            locale: "en",
            name: "Xbox Series S",
            description: "Microsoft's 9th generation console.",
          },
        ],
      },
    },
  });

  // Consoles Nintendo
  const nes = await db.console.upsert({
    where: { slug: "nes" },
    update: {},
    create: {
      slug: "nes",
      nickname: "nes",
      brandId: nintendo.id,
      releaseDate: new Date("1985-07-15"),
      generation: 3,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "NES", description: "Console de 3ª geração da Nintendo." },
          { locale: "en", name: "NES", description: "Nintendo's 3rd generation console." },
        ],
      },
    },
  });

  const gameBoy = await db.console.upsert({
    where: { slug: "game-boy" },
    update: {},
    create: {
      slug: "game-boy",
      nickname: "gb",
      brandId: nintendo.id,
      releaseDate: new Date("1989-04-21"),
      generation: 4,
      type: "handheld",
      translations: {
        create: [
          { locale: "pt", name: "Game Boy", description: "Portátil de 4ª geração da Nintendo." },
          { locale: "en", name: "Game Boy", description: "Nintendo's 4th generation handheld." },
        ],
      },
    },
  });

  const snes = await db.console.upsert({
    where: { slug: "super-nintendo" },
    update: {},
    create: {
      slug: "super-nintendo",
      nickname: "snes",
      brandId: nintendo.id,
      releaseDate: new Date("1990-08-23"),
      generation: 4,
      type: "desktop",
      translations: {
        create: [
          {
            locale: "pt",
            name: "Super Nintendo",
            description: "Console de 4ª geração da Nintendo.",
          },
          {
            locale: "en",
            name: "Super Nintendo",
            description: "Nintendo's 4th generation console.",
          },
        ],
      },
    },
  });

  const n64 = await db.console.upsert({
    where: { slug: "nintendo-64" },
    update: {},
    create: {
      slug: "nintendo-64",
      nickname: "n64",
      brandId: nintendo.id,
      releaseDate: new Date("1996-09-29"),
      generation: 5,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Nintendo 64", description: "Console de 5ª geração da Nintendo." },
          { locale: "en", name: "Nintendo 64", description: "Nintendo's 5th generation console." },
        ],
      },
    },
  });

  const gameCube = await db.console.upsert({
    where: { slug: "gamecube" },
    update: {},
    create: {
      slug: "gamecube",
      nickname: "gamecube",
      brandId: nintendo.id,
      releaseDate: new Date("2001-09-14"),
      generation: 6,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "GameCube", description: "Console de 6ª geração da Nintendo." },
          { locale: "en", name: "GameCube", description: "Nintendo's 6th generation console." },
        ],
      },
    },
  });

  const ds = await db.console.upsert({
    where: { slug: "nintendo-ds" },
    update: {},
    create: {
      slug: "nintendo-ds",
      nickname: "ds",
      brandId: nintendo.id,
      releaseDate: new Date("2004-11-21"),
      generation: 7,
      type: "handheld",
      translations: {
        create: [
          { locale: "pt", name: "Nintendo DS", description: "Portátil de 7ª geração da Nintendo." },
          { locale: "en", name: "Nintendo DS", description: "Nintendo's 7th generation handheld." },
        ],
      },
    },
  });

  const wii = await db.console.upsert({
    where: { slug: "wii" },
    update: {},
    create: {
      slug: "wii",
      nickname: "wii",
      brandId: nintendo.id,
      releaseDate: new Date("2006-11-19"),
      generation: 7,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Wii", description: "Console de 7ª geração da Nintendo." },
          { locale: "en", name: "Wii", description: "Nintendo's 7th generation console." },
        ],
      },
    },
  });

  const threeDS = await db.console.upsert({
    where: { slug: "nintendo-3ds" },
    update: {},
    create: {
      slug: "nintendo-3ds",
      nickname: "3ds",
      brandId: nintendo.id,
      releaseDate: new Date("2011-02-26"),
      generation: 8,
      type: "handheld",
      translations: {
        create: [
          {
            locale: "pt",
            name: "Nintendo 3DS",
            description: "Portátil de 8ª geração da Nintendo.",
          },
          {
            locale: "en",
            name: "Nintendo 3DS",
            description: "Nintendo's 8th generation handheld.",
          },
        ],
      },
    },
  });

  const wiiU = await db.console.upsert({
    where: { slug: "wii-u" },
    update: {},
    create: {
      slug: "wii-u",
      nickname: "wiiu",
      brandId: nintendo.id,
      releaseDate: new Date("2012-11-18"),
      generation: 8,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Wii U", description: "Console de 8ª geração da Nintendo." },
          { locale: "en", name: "Wii U", description: "Nintendo's 8th generation console." },
        ],
      },
    },
  });

  const switchConsole = await db.console.upsert({
    where: { slug: "nintendo-switch" },
    update: {},
    create: {
      slug: "nintendo-switch",
      nickname: "switch",
      brandId: nintendo.id,
      releaseDate: new Date("2017-03-03"),
      generation: 8, // Correção: 8ª geração
      type: "hybrid",
      translations: {
        create: [
          {
            locale: "pt",
            name: "Nintendo Switch",
            description: "Console híbrido de 8ª geração da Nintendo.",
          },
          {
            locale: "en",
            name: "Nintendo Switch",
            description: "Nintendo's 8th generation hybrid console.",
          },
        ],
      },
    },
  });

  // Consoles Sega
  const masterSystem = await db.console.upsert({
    where: { slug: "sega-master-system" },
    update: {},
    create: {
      slug: "sega-master-system",
      nickname: "mastersystem",
      brandId: sega.id,
      releaseDate: new Date("1985-10-20"),
      generation: 3,
      type: "desktop",
      translations: {
        create: [
          {
            locale: "pt",
            name: "Sega Master System",
            description: "Console de 3ª geração da Sega.",
          },
          {
            locale: "en",
            name: "Sega Master System",
            description: "Sega's 3rd generation console.",
          },
        ],
      },
    },
  });

  const megaDrive = await db.console.upsert({
    where: { slug: "sega-mega-drive" },
    update: {},
    create: {
      slug: "sega-mega-drive",
      nickname: "megadrive",
      brandId: sega.id,
      releaseDate: new Date("1988-10-29"),
      generation: 4,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Sega Mega Drive", description: "Console de 4ª geração da Sega." },
          { locale: "en", name: "Sega Mega Drive", description: "Sega's 4th generation console." },
        ],
      },
    },
  });

  const saturn = await db.console.upsert({
    where: { slug: "sega-saturn" },
    update: {},
    create: {
      slug: "sega-saturn",
      nickname: "saturn",
      brandId: sega.id,
      releaseDate: new Date("1994-11-22"),
      generation: 5,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Sega Saturn", description: "Console de 5ª geração da Sega." },
          { locale: "en", name: "Sega Saturn", description: "Sega's 5th generation console." },
        ],
      },
    },
  });

  const dreamcast = await db.console.upsert({
    where: { slug: "sega-dreamcast" },
    update: {},
    create: {
      slug: "sega-dreamcast",
      nickname: "dreamcast",
      brandId: sega.id,
      releaseDate: new Date("1999-11-27"),
      generation: 6,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Sega Dreamcast", description: "Console de 6ª geração da Sega." },
          { locale: "en", name: "Sega Dreamcast", description: "Sega's 6th generation console." },
        ],
      },
    },
  });

  // Consoles Atari
  const atari2600 = await db.console.upsert({
    where: { slug: "atari-2600" },
    update: {},
    create: {
      slug: "atari-2600",
      nickname: "2600",
      brandId: atari.id,
      releaseDate: new Date("1977-09-11"),
      generation: 2,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Atari 2600", description: "Console de 2ª geração da Atari." },
          { locale: "en", name: "Atari 2600", description: "Atari's 2nd generation console." },
        ],
      },
    },
  });

  const atari7800 = await db.console.upsert({
    where: { slug: "atari-7800" },
    update: {},
    create: {
      slug: "atari-7800",
      nickname: "7800",
      brandId: atari.id,
      releaseDate: new Date("1986-05-01"),
      generation: 3,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Atari 7800", description: "Console de 3ª geração da Atari." },
          { locale: "en", name: "Atari 7800", description: "Atari's 3rd generation console." },
        ],
      },
    },
  });

  const atari5200 = await db.console.upsert({
    where: { slug: "atari-5200" },
    update: {},
    create: {
      slug: "atari-5200",
      nickname: "5200",
      brandId: atari.id,
      releaseDate: new Date("1982-11-01"),
      generation: 2,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Atari 5200", description: "Console de 2ª geração da Atari." },
          { locale: "en", name: "Atari 5200", description: "Atari's 2nd generation console." },
        ],
      },
    },
  });

  return {
    ps1,
    ps2,
    psp,
    ps3,
    psVita,
    ps4,
    ps5,
    xbox,
    xbox360,
    xboxOne,
    xboxSeriesX,
    xboxSeriesS,
    nes,
    gameBoy,
    snes,
    n64,
    gameCube,
    ds,
    wii,
    threeDS,
    wiiU,
    switchConsole,
    masterSystem,
    megaDrive,
    saturn,
    dreamcast,
    atari2600,
    atari7800,
    atari5200,
  };
}
