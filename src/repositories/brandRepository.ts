// src/repositories/brandRepository.ts
import { db } from "../core/db";

export const listBrands = async () => {
  return db.brand.findMany({
    select: {
      id: true,
      slug: true,
    },
  });
};
