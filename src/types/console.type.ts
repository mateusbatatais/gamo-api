export interface ConsoleBrand {
  id: number;
  slug: string;
}

export interface ConsoleVariant {
  id: number;
  slug: string;
  brand: ConsoleBrand;
  generation?: number | null;
  name: string;
  consoleName: string;
  imageUrl?: string | null;
}

export interface ConsoleVariantsMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ConsoleVariantsResponse {
  items: ConsoleVariant[];
  meta: ConsoleVariantsMeta;
}
