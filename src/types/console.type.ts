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

export interface ConsoleVariantDetail {
  id: number;
  slug: string;
  brand: ConsoleBrand;
  generation?: number | null;
  type: string | null;
  releaseDate: Date | null;
  name: string;
  consoleName: string;
  consoleDescription: string | null;
  imageUrl: string | null;
  launchDate: Date | null;
  storage: string | null;
  skins: SkinDetail[];
}

export interface SkinDetail {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  editionName: string | null;
  releaseDate: Date | null;
  limitedEdition: boolean | null;
  material: string | null;
  finish: string | null;
  imageUrl: string | null;
}
