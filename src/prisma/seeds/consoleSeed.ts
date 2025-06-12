import { PrismaClient } from "@prisma/client";
import { createBrands } from "./brandSeed";

const db = new PrismaClient();

export async function createConsoles() {
  const { microsoft, nintendo, sega, atari, sony } = await createBrands(); // Agora só pegamos as marcas necessárias

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

  const ps4 = await db.console.upsert({
    where: { slug: "playstation-4" },
    update: {},
    create: {
      slug: "playstation-4",
      nickname: "ps4",
      brandId: sony.id,
      releaseDate: new Date("2013-11-15"),
      generation: 7,
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
      generation: "9ª geração",
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "PlayStation 5", description: "Console de 9ª geração da Sony." },
          { locale: "en", name: "PlayStation 5", description: "Sony's 9th generation console." },
        ],
      },
    },
  });
  // Consoles Microsoft (do Xbox original ao Xbox Series X/S)
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
      generation: 7,
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
      generation: "9ª geração",
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
      generation: "9ª geração",
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

  // Consoles Nintendo (de NES ao Switch)
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

  const switchConsole = await db.console.upsert({
    where: { slug: "nintendo-switch" },
    update: {},
    create: {
      slug: "nintendo-switch",
      nickname: "switch",
      brandId: nintendo.id,
      releaseDate: new Date("2017-03-03"),
      generation: 7,
      type: "desktop",
      translations: {
        create: [
          { locale: "pt", name: "Nintendo Switch", description: "Console híbrido da Nintendo." },
          { locale: "en", name: "Nintendo Switch", description: "Nintendo's hybrid console." },
        ],
      },
    },
  });

  // Consoles Sega (do Master System ao Dreamcast)
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

  return {
    ps1,
    ps2,
    ps3,
    ps4,
    ps5,
    xbox,
    xbox360,
    xboxOne,
    xboxSeriesX,
    xboxSeriesS,
    nes,
    snes,
    n64,
    wii,
    switchConsole,
    masterSystem,
    megaDrive,
    dreamcast,
    atari2600,
  };
}
