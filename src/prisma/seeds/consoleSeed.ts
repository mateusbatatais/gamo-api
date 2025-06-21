// prisma/seeds/consoles.ts
import { PrismaClient } from "@prisma/client";
import { getBrandId } from "./helpers";

type BrandSlug = "sony" | "microsoft" | "nintendo" | "sega" | "atari";

interface ConsoleDefinition {
  slug: string;
  nickname: string;
  brandSlug: BrandSlug;
  releaseDate: Date;
  generation: number;
  type: "desktop" | "handheld" | "hybrid";
  translations: {
    pt: { name: string; description: string };
    en: { name: string; description: string };
  };
}

export async function createConsoles(db: PrismaClient, brands: Record<BrandSlug, { id: number }>) {
  const consoleDefinitions: ConsoleDefinition[] = [
    // Sony
    {
      slug: "playstation-1",
      nickname: "ps1",
      brandSlug: "sony",
      releaseDate: new Date("1994-12-03"),
      generation: 5,
      type: "desktop",
      translations: {
        pt: {
          name: "PlayStation 1",
          description: "Console de 5ª geração da Sony.",
        },
        en: {
          name: "PlayStation 1",
          description: "Sony's 5th generation console.",
        },
      },
    },
    {
      slug: "playstation-2",
      nickname: "ps2",
      brandSlug: "sony",
      releaseDate: new Date("2000-10-26"),
      generation: 6,
      type: "desktop",
      translations: {
        pt: {
          name: "PlayStation 2",
          description: "Console de 6ª geração da Sony.",
        },
        en: {
          name: "PlayStation 2",
          description: "Sony's 6th generation console.",
        },
      },
    },
    {
      slug: "psp",
      nickname: "psp",
      brandSlug: "sony",
      releaseDate: new Date("2004-12-12"),
      generation: 7,
      type: "handheld",
      translations: {
        pt: {
          name: "PSP",
          description: "Portátil de 7ª geração da Sony.",
        },
        en: {
          name: "PSP",
          description: "Sony's 7th generation handheld.",
        },
      },
    },
    {
      slug: "playstation-3",
      nickname: "ps3",
      brandSlug: "sony",
      releaseDate: new Date("2006-11-17"),
      generation: 7,
      type: "desktop",
      translations: {
        pt: {
          name: "PlayStation 3",
          description: "Console de 7ª geração da Sony.",
        },
        en: {
          name: "PlayStation 3",
          description: "Sony's 7th generation console.",
        },
      },
    },
    {
      slug: "ps-vita",
      nickname: "vita",
      brandSlug: "sony",
      releaseDate: new Date("2011-12-17"),
      generation: 8,
      type: "handheld",
      translations: {
        pt: {
          name: "PS Vita",
          description: "Portátil de 8ª geração da Sony.",
        },
        en: {
          name: "PS Vita",
          description: "Sony's 8th generation handheld.",
        },
      },
    },
    {
      slug: "playstation-4",
      nickname: "ps4",
      brandSlug: "sony",
      releaseDate: new Date("2013-11-15"),
      generation: 8,
      type: "desktop",
      translations: {
        pt: {
          name: "PlayStation 4",
          description: "Console de 8ª geração da Sony.",
        },
        en: {
          name: "PlayStation 4",
          description: "Sony's 8th generation console.",
        },
      },
    },
    {
      slug: "playstation-5",
      nickname: "ps5",
      brandSlug: "sony",
      releaseDate: new Date("2020-11-12"),
      generation: 9,
      type: "desktop",
      translations: {
        pt: {
          name: "PlayStation 5",
          description: "Console de 9ª geração da Sony.",
        },
        en: {
          name: "PlayStation 5",
          description: "Sony's 9th generation console.",
        },
      },
    },

    // Microsoft
    {
      slug: "xbox",
      nickname: "xbox",
      brandSlug: "microsoft",
      releaseDate: new Date("2001-11-15"),
      generation: 6,
      type: "desktop",
      translations: {
        pt: {
          name: "Xbox",
          description: "Console de 6ª geração da Microsoft.",
        },
        en: {
          name: "Xbox",
          description: "Microsoft's 6th generation console.",
        },
      },
    },
    {
      slug: "xbox-360",
      nickname: "xbox360",
      brandSlug: "microsoft",
      releaseDate: new Date("2005-11-22"),
      generation: 7,
      type: "desktop",
      translations: {
        pt: {
          name: "Xbox 360",
          description: "Console de 7ª geração da Microsoft.",
        },
        en: {
          name: "Xbox 360",
          description: "Microsoft's 7th generation console.",
        },
      },
    },
    {
      slug: "xbox-one",
      nickname: "xboxone",
      brandSlug: "microsoft",
      releaseDate: new Date("2013-11-22"),
      generation: 8,
      type: "desktop",
      translations: {
        pt: {
          name: "Xbox One",
          description: "Console de 8ª geração da Microsoft.",
        },
        en: {
          name: "Xbox One",
          description: "Microsoft's 8th generation console.",
        },
      },
    },
    {
      slug: "xbox-series-x",
      nickname: "xboxx",
      brandSlug: "microsoft",
      releaseDate: new Date("2020-11-10"),
      generation: 9,
      type: "desktop",
      translations: {
        pt: {
          name: "Xbox Série X",
          description: "Console de 9ª geração da Microsoft.",
        },
        en: {
          name: "Xbox Series X",
          description: "Microsoft's 9th generation console.",
        },
      },
    },
    {
      slug: "xbox-series-s",
      nickname: "xboxseriesS",
      brandSlug: "microsoft",
      releaseDate: new Date("2020-11-10"),
      generation: 9,
      type: "desktop",
      translations: {
        pt: {
          name: "Xbox Série S",
          description: "Console de 9ª geração da Microsoft.",
        },
        en: {
          name: "Xbox Series S",
          description: "Microsoft's 9th generation console.",
        },
      },
    },

    // Nintendo
    {
      slug: "nes",
      nickname: "nes",
      brandSlug: "nintendo",
      releaseDate: new Date("1985-07-15"),
      generation: 3,
      type: "desktop",
      translations: {
        pt: {
          name: "NES",
          description: "Console de 3ª geração da Nintendo.",
        },
        en: {
          name: "NES",
          description: "Nintendo's 3rd generation console.",
        },
      },
    },
    {
      slug: "game-boy",
      nickname: "gb",
      brandSlug: "nintendo",
      releaseDate: new Date("1989-04-21"),
      generation: 4,
      type: "handheld",
      translations: {
        pt: {
          name: "Game Boy",
          description: "Portátil de 4ª geração da Nintendo.",
        },
        en: {
          name: "Game Boy",
          description: "Nintendo's 4th generation handheld.",
        },
      },
    },
    {
      slug: "super-nintendo",
      nickname: "snes",
      brandSlug: "nintendo",
      releaseDate: new Date("1990-08-23"),
      generation: 4,
      type: "desktop",
      translations: {
        pt: {
          name: "Super Nintendo",
          description: "Console de 4ª geração da Nintendo.",
        },
        en: {
          name: "Super Nintendo",
          description: "Nintendo's 4th generation console.",
        },
      },
    },
    {
      slug: "nintendo-64",
      nickname: "n64",
      brandSlug: "nintendo",
      releaseDate: new Date("1996-09-29"),
      generation: 5,
      type: "desktop",
      translations: {
        pt: {
          name: "Nintendo 64",
          description: "Console de 5ª geração da Nintendo.",
        },
        en: {
          name: "Nintendo 64",
          description: "Nintendo's 5th generation console.",
        },
      },
    },
    {
      slug: "gamecube",
      nickname: "gamecube",
      brandSlug: "nintendo",
      releaseDate: new Date("2001-09-14"),
      generation: 6,
      type: "desktop",
      translations: {
        pt: {
          name: "GameCube",
          description: "Console de 6ª geração da Nintendo.",
        },
        en: {
          name: "GameCube",
          description: "Nintendo's 6th generation console.",
        },
      },
    },
    {
      slug: "nintendo-ds",
      nickname: "ds",
      brandSlug: "nintendo",
      releaseDate: new Date("2004-11-21"),
      generation: 7,
      type: "handheld",
      translations: {
        pt: {
          name: "Nintendo DS",
          description: "Portátil de 7ª geração da Nintendo.",
        },
        en: {
          name: "Nintendo DS",
          description: "Nintendo's 7th generation handheld.",
        },
      },
    },
    {
      slug: "wii",
      nickname: "wii",
      brandSlug: "nintendo",
      releaseDate: new Date("2006-11-19"),
      generation: 7,
      type: "desktop",
      translations: {
        pt: {
          name: "Wii",
          description: "Console de 7ª geração da Nintendo.",
        },
        en: {
          name: "Wii",
          description: "Nintendo's 7th generation console.",
        },
      },
    },
    {
      slug: "nintendo-3ds",
      nickname: "3ds",
      brandSlug: "nintendo",
      releaseDate: new Date("2011-02-26"),
      generation: 8,
      type: "handheld",
      translations: {
        pt: {
          name: "Nintendo 3DS",
          description: "Portátil de 8ª geração da Nintendo.",
        },
        en: {
          name: "Nintendo 3DS",
          description: "Nintendo's 8th generation handheld.",
        },
      },
    },
    {
      slug: "wii-u",
      nickname: "wiiu",
      brandSlug: "nintendo",
      releaseDate: new Date("2012-11-18"),
      generation: 8,
      type: "desktop",
      translations: {
        pt: {
          name: "Wii U",
          description: "Console de 8ª geração da Nintendo.",
        },
        en: {
          name: "Wii U",
          description: "Nintendo's 8th generation console.",
        },
      },
    },
    {
      slug: "nintendo-switch",
      nickname: "switch",
      brandSlug: "nintendo",
      releaseDate: new Date("2017-03-03"),
      generation: 8,
      type: "hybrid",
      translations: {
        pt: {
          name: "Nintendo Switch",
          description: "Console híbrido de 8ª geração da Nintendo.",
        },
        en: {
          name: "Nintendo Switch",
          description: "Nintendo's 8th generation hybrid console.",
        },
      },
    },

    // Sega
    {
      slug: "sega-master-system",
      nickname: "mastersystem",
      brandSlug: "sega",
      releaseDate: new Date("1985-10-20"),
      generation: 3,
      type: "desktop",
      translations: {
        pt: {
          name: "Sega Master System",
          description: "Console de 3ª geração da Sega.",
        },
        en: {
          name: "Sega Master System",
          description: "Sega's 3rd generation console.",
        },
      },
    },
    {
      slug: "sega-mega-drive",
      nickname: "megadrive",
      brandSlug: "sega",
      releaseDate: new Date("1988-10-29"),
      generation: 4,
      type: "desktop",
      translations: {
        pt: {
          name: "Sega Mega Drive",
          description: "Console de 4ª geração da Sega.",
        },
        en: {
          name: "Sega Mega Drive",
          description: "Sega's 4th generation console.",
        },
      },
    },
    {
      slug: "sega-saturn",
      nickname: "saturn",
      brandSlug: "sega",
      releaseDate: new Date("1994-11-22"),
      generation: 5,
      type: "desktop",
      translations: {
        pt: {
          name: "Sega Saturn",
          description: "Console de 5ª geração da Sega.",
        },
        en: {
          name: "Sega Saturn",
          description: "Sega's 5th generation console.",
        },
      },
    },
    {
      slug: "sega-dreamcast",
      nickname: "dreamcast",
      brandSlug: "sega",
      releaseDate: new Date("1999-11-27"),
      generation: 6,
      type: "desktop",
      translations: {
        pt: {
          name: "Sega Dreamcast",
          description: "Console de 6ª geração da Sega.",
        },
        en: {
          name: "Sega Dreamcast",
          description: "Sega's 6th generation console.",
        },
      },
    },

    // Atari
    {
      slug: "atari-2600",
      nickname: "2600",
      brandSlug: "atari",
      releaseDate: new Date("1977-09-11"),
      generation: 2,
      type: "desktop",
      translations: {
        pt: {
          name: "Atari 2600",
          description: "Console de 2ª geração da Atari.",
        },
        en: {
          name: "Atari 2600",
          description: "Atari's 2nd generation console.",
        },
      },
    },
    {
      slug: "atari-7800",
      nickname: "7800",
      brandSlug: "atari",
      releaseDate: new Date("1986-05-01"),
      generation: 3,
      type: "desktop",
      translations: {
        pt: {
          name: "Atari 7800",
          description: "Console de 3ª geração da Atari.",
        },
        en: {
          name: "Atari 7800",
          description: "Atari's 3rd generation console.",
        },
      },
    },
    {
      slug: "atari-5200",
      nickname: "5200",
      brandSlug: "atari",
      releaseDate: new Date("1982-11-01"),
      generation: 2,
      type: "desktop",
      translations: {
        pt: {
          name: "Atari 5200",
          description: "Console de 2ª geração da Atari.",
        },
        en: {
          name: "Atari 5200",
          description: "Atari's 2nd generation console.",
        },
      },
    },
  ];

  const createdConsoles: Record<string, import("@prisma/client").Console> = {};

  for (const def of consoleDefinitions) {
    const brandId = getBrandId(brands, def.brandSlug);

    const console = await db.console.upsert({
      where: { slug: def.slug },
      update: {},
      create: {
        slug: def.slug,
        nickname: def.nickname,
        brandId,
        releaseDate: def.releaseDate,
        generation: def.generation,
        type: def.type,
        translations: {
          create: [
            {
              locale: "pt",
              name: def.translations.pt.name,
              description: def.translations.pt.description,
            },
            {
              locale: "en",
              name: def.translations.en.name,
              description: def.translations.en.description,
            },
          ],
        },
      },
    });

    createdConsoles[def.slug] = console;
  }

  return createdConsoles;
}
