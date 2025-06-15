import { listBrands } from "./brand.repository";
import { Brand } from "./brand.schema";

export const getBrands = async (): Promise<Brand[]> => {
  return listBrands();
};
