import { db } from "../lib/db";

export interface CreateUserConsoleInput {
  consoleId: number;
  variantSlug: string;
  skinSlug?: string | null;
  customSkin?: string | null;
  note?: string | null;
  photoUrl?: string | null;
}

export async function listUserConsoles(userId: number) {
  return db.userConsole.findMany({
    where: { userId },
    include: { console: true, variant: true, skin: true },
  });
}

export async function addUserConsole(
  userId: number,
  data: CreateUserConsoleInput
) {
  const variant = await db.consoleVariant.findUnique({
    where: {
      consoleId_slug: { consoleId: data.consoleId, slug: data.variantSlug },
    },
  });
  if (!variant) throw new Error("Variant not found");

  let skinId: number | undefined;
  if (data.skinSlug) {
    const skin = await db.skin.findUnique({
      where: { slug: data.skinSlug },
    });
    if (!skin) throw new Error("Skin not found");
    if (skin.consoleVariantId !== variant.id) {
      throw new Error("Skin não pertence a essa variante");
    }
    skinId = skin.id;
  }

  return db.userConsole.create({
    data: {
      userId,
      consoleId: data.consoleId,
      consoleVariantId: variant.id,
      skinId,
      customSkin: data.customSkin,
      note: data.note,
      photoUrl: data.photoUrl,
    },
  });
}
