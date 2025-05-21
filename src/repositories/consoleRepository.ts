import { db } from "../lib/db";
export const findVariantBySlug = (consoleId: number, slug: string) =>
  db.consoleVariant.findUnique({
    where: { consoleId_slug: { consoleId, slug } },
  });
