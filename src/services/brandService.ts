// src/services/brandService.ts
import { listBrands } from "../repositories/brandRepository";
import { BrandDTO } from "../dtos/brand.dto";

export const getBrands = async (): Promise<BrandDTO[]> => {
  const raw = await listBrands();
  return raw.map((b) => ({
    id: b.id,
    slug: b.slug,
  }));
};
