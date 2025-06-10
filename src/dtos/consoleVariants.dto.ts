// src/dtos/consoleVariants.dto.ts
export interface ConsoleVariantDTO {
  id: number;
  slug: string;
  brand: { id: number; slug: string };
  name: string;
}

export interface ConsoleVariantsResponse {
  items: ConsoleVariantDTO[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}
