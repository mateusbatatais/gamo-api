/**
 * Normaliza texto para buscas:
 * 1. Remove acentos
 * 2. Converte para minúsculas
 * 3. Remove caracteres especiais
 */
export const normalizeSearch = (term: string): string => {
  return term
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ") // Substitui caracteres especiais por espaços
    .replace(/\s+/g, " ") // Normaliza múltiplos espaços
    .trim();
};
