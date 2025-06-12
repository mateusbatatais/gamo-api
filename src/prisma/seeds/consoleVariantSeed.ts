import { PrismaClient } from "@prisma/client";
import { createConsoles } from "./consoleSeed";

const db = new PrismaClient();

export async function createConsoleVariants() {
  const {
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
  } = await createConsoles(); // Acesse os consoles criados no arquivo anterior

  // Variações para o PS1
  const ps1Fat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps1.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: ps1.id,
      slug: "fat",
      launchDate: new Date("1994-12-03"),
      storage: "1 GB",
      imageUrl: "https://example.com/images/ps1-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  const ps1Slim = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps1.id, slug: "slim" } },
    update: {},
    create: {
      consoleId: ps1.id,
      slug: "slim",
      launchDate: new Date("1997-09-01"),
      storage: "1 GB",
      imageUrl: "https://example.com/images/ps1-slim.png",
      translations: {
        create: [
          { locale: "pt", name: "Slim" },
          { locale: "en", name: "Slim" },
        ],
      },
    },
  });

  // Variações para o PS2
  const ps2Fat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps2.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: ps2.id,
      slug: "fat",
      launchDate: new Date("2000-10-26"),
      storage: "40 GB",
      imageUrl: "https://example.com/images/ps2-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  const ps2Slim = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps2.id, slug: "slim" } },
    update: {},
    create: {
      consoleId: ps2.id,
      slug: "slim",
      launchDate: new Date("2004-09-01"),
      storage: "120 GB",
      imageUrl: "https://example.com/images/ps2-slim.png",
      translations: {
        create: [
          { locale: "pt", name: "Slim" },
          { locale: "en", name: "Slim" },
        ],
      },
    },
  });

  // Variações para o PS3
  const ps3Fat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps3.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: ps3.id,
      slug: "fat",
      launchDate: new Date("2006-11-17"),
      storage: "60 GB",
      imageUrl: "https://example.com/images/ps3-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  const ps3Slim = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps3.id, slug: "slim" } },
    update: {},
    create: {
      consoleId: ps3.id,
      slug: "slim",
      launchDate: new Date("2009-08-30"),
      storage: "120 GB",
      imageUrl: "https://example.com/images/ps3-slim.png",
      translations: {
        create: [
          { locale: "pt", name: "Slim" },
          { locale: "en", name: "Slim" },
        ],
      },
    },
  });

  // Variações para o PS4
  const ps4Fat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps4.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: ps4.id,
      slug: "fat",
      launchDate: new Date("2013-11-15"),
      storage: "500 GB",
      imageUrl: "https://example.com/images/ps4-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  const ps4Slim = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps4.id, slug: "slim" } },
    update: {},
    create: {
      consoleId: ps4.id,
      slug: "slim",
      launchDate: new Date("2016-09-15"),
      storage: "1 TB",
      imageUrl: "https://example.com/images/ps4-slim.png",
      translations: {
        create: [
          { locale: "pt", name: "Slim" },
          { locale: "en", name: "Slim" },
        ],
      },
    },
  });

  // Variações para o PS5
  const ps5Fat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps5.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: ps5.id,
      slug: "fat",
      launchDate: new Date("2020-11-12"),
      storage: "825 GB",
      imageUrl: "https://example.com/images/ps5-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  const ps5Slim = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: ps5.id, slug: "slim" } },
    update: {},
    create: {
      consoleId: ps5.id,
      slug: "slim",
      launchDate: new Date("2022-09-01"),
      storage: "1 TB",
      imageUrl: "https://example.com/images/ps5-slim.png",
      translations: {
        create: [
          { locale: "pt", name: "Slim" },
          { locale: "en", name: "Slim" },
        ],
      },
    },
  });

  // Xbox 360 Variants
  const xbox360Fat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: xbox360.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: xbox360.id,
      slug: "fat",
      launchDate: new Date("2005-11-22"),
      storage: "20 GB",
      imageUrl: "https://example.com/images/xbox360-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Xbox One Variants
  const xboxOneFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: xboxOne.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: xboxOne.id,
      slug: "fat",
      launchDate: new Date("2013-11-22"),
      storage: "500 GB",
      imageUrl: "https://example.com/images/xboxone-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Xbox Series X Variants
  const xboxSeriesXFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: xboxSeriesX.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: xboxSeriesX.id,
      slug: "fat",
      launchDate: new Date("2020-11-10"),
      storage: "1 TB",
      imageUrl: "https://example.com/images/xboxseriesx-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Xbox Series S Variants
  const xboxSeriesSFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: xboxSeriesS.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: xboxSeriesS.id,
      slug: "fat",
      launchDate: new Date("2020-11-10"),
      storage: "512 GB",
      imageUrl: "https://example.com/images/xboxseriess-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // NES Variants
  const nesFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: nes.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: nes.id,
      slug: "fat",
      launchDate: new Date("1985-07-15"),
      storage: "1 MB",
      imageUrl: "https://example.com/images/nes-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // SNES Variants
  const snesFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: snes.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: snes.id,
      slug: "fat",
      launchDate: new Date("1990-08-23"),
      storage: "4 MB",
      imageUrl: "https://example.com/images/snes-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // N64 Variants
  const n64Fat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: n64.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: n64.id,
      slug: "fat",
      launchDate: new Date("1996-09-29"),
      storage: "4 MB",
      imageUrl: "https://example.com/images/n64-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Wii Variants
  const wiiFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: wii.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: wii.id,
      slug: "fat",
      launchDate: new Date("2006-11-19"),
      storage: "512 MB",
      imageUrl: "https://example.com/images/wii-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Switch Variants
  const switchFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: switchConsole.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: switchConsole.id,
      slug: "fat",
      launchDate: new Date("2017-03-03"),
      storage: "32 GB",
      imageUrl: "https://example.com/images/switch-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Master System Variants
  const masterSystemFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: masterSystem.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: masterSystem.id,
      slug: "fat",
      launchDate: new Date("1985-10-20"),
      storage: "128 KB",
      imageUrl: "https://example.com/images/masterSystem-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Mega Drive Variants
  const megaDriveFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: megaDrive.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: megaDrive.id,
      slug: "fat",
      launchDate: new Date("1988-10-29"),
      storage: "4 MB",
      imageUrl: "https://example.com/images/megaDrive-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Dreamcast Variants
  const dreamcastFat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: dreamcast.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: dreamcast.id,
      slug: "fat",
      launchDate: new Date("1999-11-27"),
      storage: "128 MB",
      imageUrl: "https://example.com/images/dreamcast-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  // Atari 2600 Variants
  const atari2600Fat = await db.consoleVariant.upsert({
    where: { consoleId_slug: { consoleId: atari2600.id, slug: "fat" } },
    update: {},
    create: {
      consoleId: atari2600.id,
      slug: "fat",
      launchDate: new Date("1977-09-11"),
      storage: "128 KB",
      imageUrl: "https://example.com/images/atari2600-fat.png",
      translations: {
        create: [
          { locale: "pt", name: "Modelo Padrão" },
          { locale: "en", name: "Standard Model" },
        ],
      },
    },
  });

  return {
    ps1Fat,
    ps1Slim,
    ps2Fat,
    ps2Slim,
    ps3Fat,
    ps3Slim,
    ps4Fat,
    ps4Slim,
    ps5Fat,
    ps5Slim,
    xbox360Fat,
    xboxOneFat,
    xboxSeriesXFat,
    xboxSeriesSFat,
    nesFat,
    snesFat,
    n64Fat,
    wiiFat,
    switchFat,
    masterSystemFat,
    megaDriveFat,
    dreamcastFat,
    atari2600Fat,
  };
}
