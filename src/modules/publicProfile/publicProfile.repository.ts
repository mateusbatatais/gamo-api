import { db } from "../../core/db";
import { PublicUserProfile, UserConsolePublic, UserGamePublic } from "./publicProfile.schema";

export const getUserBySlug = async (slug: string): Promise<PublicUserProfile | null> => {
  return db.user.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      profileImage: true,
      description: true,
    },
  });
};

export const getUserConsolesPublic = async (
  userId: number,
  locale: string = "pt",
): Promise<UserConsolePublic[]> => {
  const consoles = await db.userConsole.findMany({
    where: { userId },
    select: {
      id: true,
      consoleId: true,
      console: {
        select: {
          translations: {
            where: { locale },
            select: { name: true },
          },
        },
      },
      variant: {
        select: {
          translations: {
            where: { locale },
            select: { name: true },
          },
        },
      },
      skin: {
        select: {
          translations: {
            where: { locale: "pt" },
            select: { name: true },
          },
        },
      },
      customSkin: true,
      description: true,
      status: true,
      price: true,
      hasBox: true,
      hasManual: true,
      condition: true,
      acceptsTrade: true,
      photoUrl: true,
      createdAt: true,
    },
  });

  return consoles.map((console) => ({
    id: console.id,
    consoleId: console.consoleId,
    consoleName: console.console.translations[0]?.name || "Unknown Console",
    variantName: console.variant.translations[0]?.name || "Unknown Variant",
    skinName: console.skin?.translations[0]?.name || null,
    customSkin: console.customSkin,
    description: console.description,
    status: console.status,
    price: console.price,
    hasBox: console.hasBox,
    hasManual: console.hasManual,
    condition: console.condition,
    acceptsTrade: console.acceptsTrade,
    photoUrl: console.photoUrl,
    createdAt: console.createdAt,
  }));
};

export const getUserGamesPublic = async (userId: number): Promise<UserGamePublic[]> => {
  const games = await db.userItem.findMany({
    where: { userId },
    select: {
      id: true,
      gameId: true,
      game: {
        select: {
          translations: {
            where: { locale: "pt" },
            select: { title: true },
          },
        },
      },
      console: {
        select: {
          translations: {
            where: { locale: "pt" },
            select: { name: true },
          },
        },
      },
      status: true,
      customName: true,
      photoUrl: true,
    },
  });

  return games.map((game) => ({
    id: game.id,
    gameId: game.gameId,
    gameTitle: game.game.translations[0]?.title || "Unknown Game",
    consoleName: game.console.translations[0]?.name || "Unknown Console",
    status: game.status,
    customName: game.customName,
    photoUrl: game.photoUrl,
  }));
};
