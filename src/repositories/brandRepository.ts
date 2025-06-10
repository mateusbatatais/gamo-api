// src/repositories/brandRepository.ts
import { db } from "../lib/db";

export const listBrands = async () => {
  return db.brand.findMany({
    select: {
      id: true,
      slug: true,
    },
  });
};
