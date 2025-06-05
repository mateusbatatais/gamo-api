// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ─────────────────────────────────────────────────────────────────────────────
  // 1) IGNORAR PASTA
  {
    ignores: ["src/generated/**", "dist/**", "node_modules/**", "coverage/**"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2) CONFIGURAÇÃO PADRÃO DO TYPESCRIPT-ESLINT (RECOMMENDED)
  tseslint.configs.recommended,

  // ─────────────────────────────────────────────────────────────────────────────
  // 3) REGRAS PARA JS/TS: PLUGINS e __SOBRESCRITA__ DE REGRAS
  //    → este bloco vem DEPOIS do `tseslint.configs.recommended`
  //      para garantir que “off” realmente prevaleça.
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      // desativa quem proíbe "var x = require('...')"
      "@typescript-eslint/no-var-requires": "off",

      // desativa quem proíbe qualquer require() em substituição a import
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4) GLOBAIS DO NODE
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // 5) AQUI: habilita as globals do Jest em arquivos de teste
  {
    files: ["**/*.spec.ts", "**/*.test.ts", "tests/**/*.ts"],
    languageOptions: {
      globals: globals.jest, // ativa describe, it, expect, jest, etc.
    },
  },
]);
