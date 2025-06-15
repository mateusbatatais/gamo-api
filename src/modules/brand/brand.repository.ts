// src/repositories/brandRepository.ts

import { db } from "../../core/db";
import { Brand } from "./brand.schema";

export const listBrands = async (): Promise<Brand[]> => {
  return db.brand.findMany({
    select: {
      id: true,
      slug: true,
    },
  });
};
