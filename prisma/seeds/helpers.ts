type BrandSlug = "sony" | "microsoft" | "nintendo" | "sega" | "atari";

export const getBrandId = (brands: Record<BrandSlug, { id: number }>, slug: BrandSlug) => {
  const brand = brands[slug];
  if (!brand) throw new Error(`Marca não encontrada: ${slug}`);
  return brand.id;
};

// Função para criar traduções
export const createTranslations = (data: { pt: string; en: string }[]) => ({
  create: [
    { locale: "pt", name: data[0].pt, description: data[1]?.pt },
    { locale: "en", name: data[0].en, description: data[1]?.en },
  ],
});
