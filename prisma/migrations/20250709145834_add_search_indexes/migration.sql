-- Adicione extensões se ainda não existirem
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;
-- Crie uma função helper para unaccent
CREATE OR REPLACE FUNCTION f_unaccent(text) RETURNS text AS $$
SELECT unaccent('unaccent', $1);
$$ LANGUAGE sql IMMUTABLE;
-- Crie índices para Console
CREATE INDEX IF NOT EXISTS console_nickname_trgm_idx ON "Console" USING gin (f_unaccent("nickname") gin_trgm_ops);
CREATE INDEX IF NOT EXISTS console_slug_trgm_idx ON "Console" USING gin (f_unaccent("slug") gin_trgm_ops);
-- Crie índices para ConsoleTranslation
CREATE INDEX IF NOT EXISTS console_translation_name_trgm_idx ON "ConsoleTranslation" USING gin (f_unaccent("name") gin_trgm_ops);
-- Crie índices para ConsoleVariant
CREATE INDEX IF NOT EXISTS variant_slug_trgm_idx ON "ConsoleVariant" USING gin (f_unaccent("slug") gin_trgm_ops);
-- Crie índices para ConsoleVariantTranslation
CREATE INDEX IF NOT EXISTS variant_translation_name_trgm_idx ON "ConsoleVariantTranslation" USING gin (f_unaccent("name") gin_trgm_ops);