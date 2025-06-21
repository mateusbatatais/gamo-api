// prisma/seeds/variants.ts
import { PrismaClient } from "@prisma/client";
import { createTranslations } from "./helpers";

interface VariantDefinition {
  slug: string;
  consoleSlug: string;
  namePt: string;
  nameEn: string;
  launchDate: Date;
  storage: string;
  imageUrl: string;
}

export async function createVariants(db: PrismaClient, consoles: Record<string, { id: number }>) {
  const variantDefinitions: VariantDefinition[] = [
    // Sony PlayStation 1
    {
      slug: "ps1-fat",
      consoleSlug: "playstation-1",
      namePt: "Modelo Original",
      nameEn: "Original Model",
      launchDate: new Date("1994-12-03"),
      storage: "1 MB",
      imageUrl: "images/consoles/sony/ps1-fat.webp",
    },
    {
      slug: "ps1-slim",
      consoleSlug: "playstation-1",
      namePt: "PS One",
      nameEn: "PS One",
      launchDate: new Date("2000-07-07"),
      storage: "1 MB",
      imageUrl: "images/consoles/sony/ps1-slim.webp",
    },

    // Sony PlayStation 2
    {
      slug: "ps2-fat",
      consoleSlug: "playstation-2",
      namePt: "Modelo Original",
      nameEn: "Original Model",
      launchDate: new Date("2000-03-04"),
      storage: "40 GB",
      imageUrl: "images/consoles/sony/ps2-fat.webp",
    },
    {
      slug: "ps2-slim",
      consoleSlug: "playstation-2",
      namePt: "Slim",
      nameEn: "Slim",
      launchDate: new Date("2004-11-01"),
      storage: "40 GB",
      imageUrl: "images/consoles/sony/ps2-slim.webp",
    },

    // Sony PlayStation 3
    {
      slug: "ps3-fat",
      consoleSlug: "playstation-3",
      namePt: "Fat",
      nameEn: "Fat",
      launchDate: new Date("2006-11-11"),
      storage: "20/60/80 GB",
      imageUrl: "images/consoles/sony/ps3-fat.webp",
    },
    {
      slug: "ps3-slim",
      consoleSlug: "playstation-3",
      namePt: "Slim",
      nameEn: "Slim",
      launchDate: new Date("2009-09-01"),
      storage: "120/250/500 GB",
      imageUrl: "images/consoles/sony/ps3-slim.webp",
    },
    {
      slug: "ps3-super-slim",
      consoleSlug: "playstation-3",
      namePt: "Super Slim",
      nameEn: "Super Slim",
      launchDate: new Date("2012-09-01"),
      storage: "250/500 GB",
      imageUrl: "images/consoles/sony/ps3-super-slim.webp",
    },

    // Sony PlayStation 4
    {
      slug: "ps4-fat",
      consoleSlug: "playstation-4",
      namePt: "Original",
      nameEn: "Original",
      launchDate: new Date("2013-11-15"),
      storage: "500 GB",
      imageUrl: "images/consoles/sony/ps4-fat.webp",
    },
    {
      slug: "ps4-slim",
      consoleSlug: "playstation-4",
      namePt: "Slim",
      nameEn: "Slim",
      launchDate: new Date("2016-09-15"),
      storage: "500 GB / 1 TB",
      imageUrl: "images/consoles/sony/ps4-slim.webp",
    },
    {
      slug: "ps4-pro",
      consoleSlug: "playstation-4",
      namePt: "Pro",
      nameEn: "Pro",
      launchDate: new Date("2016-11-10"),
      storage: "1 TB",
      imageUrl: "images/consoles/sony/ps4-pro.webp",
    },

    // Sony PlayStation 5
    {
      slug: "ps5-standard",
      consoleSlug: "playstation-5",
      namePt: "Com Leitor de Discos",
      nameEn: "Standard Edition",
      launchDate: new Date("2020-11-12"),
      storage: "825 GB",
      imageUrl: "images/consoles/sony/ps5-standard.webp",
    },
    {
      slug: "ps5-digital",
      consoleSlug: "playstation-5",
      namePt: "Digital Edition",
      nameEn: "Digital Edition",
      launchDate: new Date("2020-11-12"),
      storage: "825 GB",
      imageUrl: "images/consoles/sony/ps5-digital.webp",
    },
    {
      slug: "ps5-slim",
      consoleSlug: "playstation-5",
      namePt: "Slim",
      nameEn: "Slim",
      launchDate: new Date("2023-11-10"),
      storage: "1 TB",
      imageUrl: "images/consoles/sony/ps5-slim.webp",
    },
    {
      slug: "ps5-pro",
      consoleSlug: "playstation-5",
      namePt: "Pro",
      nameEn: "Pro",
      launchDate: new Date("2024-11-10"),
      storage: "1 TB",
      imageUrl: "images/consoles/sony/ps5-pro.webp",
    },

    // Microsoft Xbox
    {
      slug: "xbox-fat",
      consoleSlug: "xbox",
      namePt: "Original",
      nameEn: "Original",
      launchDate: new Date("2001-11-15"),
      storage: "8/10 GB",
      imageUrl: "images/consoles/microsoft/xbox-fat.webp",
    },

    // Microsoft Xbox 360
    {
      slug: "xbox360-fat",
      consoleSlug: "xbox-360",
      namePt: "Original",
      nameEn: "Original",
      launchDate: new Date("2005-11-22"),
      storage: "20/60/120 GB",
      imageUrl: "images/consoles/microsoft/xbox360-fat.webp",
    },
    {
      slug: "xbox360-slim",
      consoleSlug: "xbox-360",
      namePt: "Slim",
      nameEn: "Slim",
      launchDate: new Date("2010-06-14"),
      storage: "250 GB",
      imageUrl: "images/consoles/microsoft/xbox360-slim.webp",
    },
    {
      slug: "xbox360-e",
      consoleSlug: "xbox-360",
      namePt: "Modelo E",
      nameEn: "E Model",
      launchDate: new Date("2013-06-10"),
      storage: "250 GB",
      imageUrl: "images/consoles/microsoft/xbox360-e.webp",
    },

    // Microsoft Xbox One
    {
      slug: "xboxone-fat",
      consoleSlug: "xbox-one",
      namePt: "Original",
      nameEn: "Original",
      launchDate: new Date("2013-11-22"),
      storage: "500 GB",
      imageUrl: "images/consoles/microsoft/xbox-one-fat.webp",
    },
    {
      slug: "xboxone-s",
      consoleSlug: "xbox-one",
      namePt: "One S",
      nameEn: "One S",
      launchDate: new Date("2016-08-02"),
      storage: "500 GB / 1 TB / 2 TB",
      imageUrl: "images/consoles/microsoft/xbox-one-s.webp",
    },
    {
      slug: "xboxone-x",
      consoleSlug: "xbox-one",
      namePt: "One X",
      nameEn: "One X",
      launchDate: new Date("2017-11-07"),
      storage: "1 TB",
      imageUrl: "images/consoles/microsoft/xbox-one-x.webp",
    },

    // Microsoft Xbox Series
    {
      slug: "xboxseriesx-standard",
      consoleSlug: "xbox-series-x",
      namePt: "Série X",
      nameEn: "Series X",
      launchDate: new Date("2020-11-10"),
      storage: "1 TB",
      imageUrl: "images/consoles/microsoft/xbox-series-x.webp",
    },
    {
      slug: "xboxseriess-standard",
      consoleSlug: "xbox-series-s",
      namePt: "Série S",
      nameEn: "Series S",
      launchDate: new Date("2020-11-10"),
      storage: "512 GB",
      imageUrl: "images/consoles/microsoft/xbox-series-s.webp",
    },

    // Nintendo NES
    {
      slug: "nes-front-loader",
      consoleSlug: "nes",
      namePt: "Front Loader",
      nameEn: "Front Loader",
      launchDate: new Date("1985-07-15"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/nes-front.webp",
    },
    {
      slug: "nes-top-loader",
      consoleSlug: "nes",
      namePt: "Top Loader",
      nameEn: "Top Loader",
      launchDate: new Date("1993-06-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/nes-top.webp",
    },

    // Nintendo Game Boy
    {
      slug: "gameboy-original",
      consoleSlug: "game-boy",
      namePt: "Original",
      nameEn: "Original",
      launchDate: new Date("1989-04-21"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/gb-original.webp",
    },
    {
      slug: "gameboy-pocket",
      consoleSlug: "game-boy",
      namePt: "Pocket",
      nameEn: "Pocket",
      launchDate: new Date("1996-07-21"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/gb-pocket.webp",
    },
    {
      slug: "gameboy-color",
      consoleSlug: "game-boy",
      namePt: "Color",
      nameEn: "Color",
      launchDate: new Date("1998-10-21"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/gbc.webp",
    },

    // Nintendo Super Nintendo
    {
      slug: "snes-original",
      consoleSlug: "super-nintendo",
      namePt: "Modelo Original",
      nameEn: "Original Model",
      launchDate: new Date("1990-08-23"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/snes-original.webp",
    },
    {
      slug: "snes-junior",
      consoleSlug: "super-nintendo",
      namePt: "Snes Jr",
      nameEn: "Snes Jr",
      launchDate: new Date("1997-10-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/snes-jr.webp",
    },

    // Nintendo 64
    {
      slug: "n64-standard",
      consoleSlug: "nintendo-64",
      namePt: "Modelo Padrão",
      nameEn: "Standard Model",
      launchDate: new Date("1996-09-29"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/n64.webp",
    },

    // Nintendo GameCube
    {
      slug: "gamecube-standard",
      consoleSlug: "gamecube",
      namePt: "Modelo Padrão",
      nameEn: "Standard Model",
      launchDate: new Date("2001-09-14"),
      storage: "Proprietary Disc",
      imageUrl: "images/consoles/nintendo/gamecube.webp",
    },

    // Nintendo DS
    {
      slug: "ds-original",
      consoleSlug: "nintendo-ds",
      namePt: "DS Original",
      nameEn: "DS Original",
      launchDate: new Date("2004-11-21"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/ds.webp",
    },
    {
      slug: "ds-lite",
      consoleSlug: "nintendo-ds",
      namePt: "DS Lite",
      nameEn: "DS Lite",
      launchDate: new Date("2006-03-02"),
      storage: "Cartucho",
      imageUrl: "images/consoles/nintendo/ds-lite.webp",
    },

    // Nintendo Wii
    {
      slug: "wii-original",
      consoleSlug: "wii",
      namePt: "Original",
      nameEn: "Original",
      launchDate: new Date("2006-11-19"),
      storage: "512 MB",
      imageUrl: "images/consoles/nintendo/wii.webp",
    },
    {
      slug: "wii-mini",
      consoleSlug: "wii",
      namePt: "Mini",
      nameEn: "Mini",
      launchDate: new Date("2012-11-18"),
      storage: "512 MB",
      imageUrl: "images/consoles/nintendo/wii-mini.webp",
    },

    // Nintendo 3DS
    {
      slug: "3ds-original",
      consoleSlug: "nintendo-3ds",
      namePt: "3DS Original",
      nameEn: "3DS Original",
      launchDate: new Date("2011-02-26"),
      storage: "2 GB",
      imageUrl: "images/consoles/nintendo/3ds.webp",
    },
    {
      slug: "3ds-xl",
      consoleSlug: "nintendo-3ds",
      namePt: "3DS XL",
      nameEn: "3DS XL",
      launchDate: new Date("2012-07-28"),
      storage: "4 GB",
      imageUrl: "images/consoles/nintendo/3ds-xl.webp",
    },

    // Nintendo Wii U
    {
      slug: "wiiu-basic",
      consoleSlug: "wii-u",
      namePt: "Basic",
      nameEn: "Basic",
      launchDate: new Date("2012-11-18"),
      storage: "8 GB",
      imageUrl: "images/consoles/nintendo/wiiu-basic.webp",
    },
    {
      slug: "wiiu-deluxe",
      consoleSlug: "wii-u",
      namePt: "Deluxe",
      nameEn: "Deluxe",
      launchDate: new Date("2012-11-18"),
      storage: "32 GB",
      imageUrl: "images/consoles/nintendo/wiiu-deluxe.webp",
    },

    // Nintendo Switch
    {
      slug: "switch-standard",
      consoleSlug: "nintendo-switch",
      namePt: "Standard",
      nameEn: "Standard",
      launchDate: new Date("2017-03-03"),
      storage: "32 GB",
      imageUrl: "images/consoles/nintendo/switch.webp",
    },
    {
      slug: "switch-oled",
      consoleSlug: "nintendo-switch",
      namePt: "OLED",
      nameEn: "OLED",
      launchDate: new Date("2021-10-08"),
      storage: "64 GB",
      imageUrl: "images/consoles/nintendo/switch-oled.webp",
    },
    {
      slug: "switch-lite",
      consoleSlug: "nintendo-switch",
      namePt: "Lite",
      nameEn: "Lite",
      launchDate: new Date("2019-09-20"),
      storage: "32 GB",
      imageUrl: "images/consoles/nintendo/switch-lite.webp",
    },

    // Sega Master System
    {
      slug: "mastersystem-original",
      consoleSlug: "sega-master-system",
      namePt: "Modelo 1",
      nameEn: "Model 1",
      launchDate: new Date("1985-10-20"),
      storage: "Cartucho",
      imageUrl: "images/consoles/sega/master-system.webp",
    },
    {
      slug: "mastersystem-ii",
      consoleSlug: "sega-master-system",
      namePt: "Master System II",
      nameEn: "Master System II",
      launchDate: new Date("1990-01-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/sega/master-system-ii.webp",
    },

    // Sega Mega Drive
    {
      slug: "megadrive-model1",
      consoleSlug: "sega-mega-drive",
      namePt: "Modelo 1",
      nameEn: "Model 1",
      launchDate: new Date("1988-10-29"),
      storage: "Cartucho",
      imageUrl: "images/consoles/sega/megadrive-model1.webp",
    },
    {
      slug: "megadrive-model2",
      consoleSlug: "sega-mega-drive",
      namePt: "Modelo 2",
      nameEn: "Model 2",
      launchDate: new Date("1993-01-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/sega/megadrive-model2.webp",
    },

    // Sega Saturn
    {
      slug: "saturn-model1",
      consoleSlug: "sega-saturn",
      namePt: "Modelo 1",
      nameEn: "Model 1",
      launchDate: new Date("1994-11-22"),
      storage: "CD",
      imageUrl: "images/consoles/sega/saturn-model1.webp",
    },
    {
      slug: "saturn-model2",
      consoleSlug: "sega-saturn",
      namePt: "Modelo 2",
      nameEn: "Model 2",
      launchDate: new Date("1996-01-01"),
      storage: "CD",
      imageUrl: "images/consoles/sega/saturn-model2.webp",
    },

    // Sega Dreamcast
    {
      slug: "dreamcast-standard",
      consoleSlug: "sega-dreamcast",
      namePt: "Modelo Padrão",
      nameEn: "Standard Model",
      launchDate: new Date("1999-11-27"),
      storage: "GD-ROM",
      imageUrl: "images/consoles/sega/dreamcast.webp",
    },

    // Atari 2600
    {
      slug: "atari2600-heavy-sixer",
      consoleSlug: "atari-2600",
      namePt: "Heavy Sixer",
      nameEn: "Heavy Sixer",
      launchDate: new Date("1977-09-11"),
      storage: "Cartucho",
      imageUrl: "images/consoles/atari/2600-heavy.webp",
    },
    {
      slug: "atari2600-light-sixer",
      consoleSlug: "atari-2600",
      namePt: "Light Sixer",
      nameEn: "Light Sixer",
      launchDate: new Date("1978-01-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/atari/2600-light.webp",
    },
    {
      slug: "atari2600-4-switch",
      consoleSlug: "atari-2600",
      namePt: "4 Switch",
      nameEn: "4 Switch",
      launchDate: new Date("1980-01-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/atari/2600-4switch.webp",
    },
    {
      slug: "atari2600-junior",
      consoleSlug: "atari-2600",
      namePt: "Junior",
      nameEn: "Junior",
      launchDate: new Date("1986-01-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/atari/2600-junior.webp",
    },

    // Atari 7800
    {
      slug: "atari7800-standard",
      consoleSlug: "atari-7800",
      namePt: "Modelo Padrão",
      nameEn: "Standard Model",
      launchDate: new Date("1986-05-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/atari/7800.webp",
    },

    // Atari 5200
    {
      slug: "atari5200-standard",
      consoleSlug: "atari-5200",
      namePt: "Modelo Padrão",
      nameEn: "Standard Model",
      launchDate: new Date("1982-11-01"),
      storage: "Cartucho",
      imageUrl: "images/consoles/atari/5200.webp",
    },
  ];

  const createdVariants: Record<string, Awaited<ReturnType<typeof db.consoleVariant.upsert>>> = {};

  for (const variant of variantDefinitions) {
    const consoleId = consoles[variant.consoleSlug]?.id;
    if (!consoleId) {
      throw new Error(`Console não encontrado: ${variant.consoleSlug}`);
    }

    const createdVariant = await db.consoleVariant.upsert({
      where: { consoleId_slug: { consoleId, slug: variant.slug } },
      update: {},
      create: {
        consoleId,
        slug: variant.slug,
        launchDate: variant.launchDate,
        storage: variant.storage,
        imageUrl: variant.imageUrl,
        translations: createTranslations([{ pt: variant.namePt, en: variant.nameEn }]),
      },
    });

    createdVariants[variant.slug] = createdVariant;
  }

  return createdVariants;
}
