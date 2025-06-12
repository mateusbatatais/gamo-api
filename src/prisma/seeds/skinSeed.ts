import { PrismaClient } from "@prisma/client";
import { createConsoleVariants } from "./consoleVariantSeed";

const db = new PrismaClient();

export async function createSkins() {
  const { ps5Fat } = await createConsoleVariants(); // Acesse as variações do console

  await db.skin.upsert({
    where: { slug: "midnight-black" },
    update: {},
    create: {
      slug: "midnight-black",
      consoleVariantId: ps5Fat.id, // PS5 Fat
      releaseDate: new Date("2023-09-01"),
      limitedEdition: false,
      editionName: null,
      material: "Plástico ABS",
      finish: "Matte",
      imageUrl: "https://example.com/images/skin-midnight-black.png",
      translations: {
        create: [
          { locale: "pt", name: "Preto Meia-Noite", description: "Skin preta fosca para PS5." },
          { locale: "en", name: "Midnight Black", description: "Matte black skin for PS5." },
        ],
      },
    },
  });
}
