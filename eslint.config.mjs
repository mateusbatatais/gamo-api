// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import vitestPlugin from "eslint-plugin-vitest";

// Obter configuração recomendada do @eslint/js
const jsRecommended = js.configs.recommended;

export default [
  // 1) Ignorar pastas
  {
    ignores: ["src/generated/**", "dist/**", "node_modules/**", "coverage/**"],
  },

  // 2) Configuração recomendada do JavaScript
  jsRecommended,

  // 3) Configuração recomendada do TypeScript
  ...tseslint.configs.recommended,

  // 4) Regras personalizadas para JS/TS
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // 5) Globais do Node
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // 6) Configuração para testes (Vitest)
  {
    files: ["**/*.spec.ts", "**/*.test.ts", "tests/**/*.ts"],
    plugins: {
      vitest: vitestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jest, // Mantém compatibilidade com globais do Jest
        vi: "readonly", // Adiciona global do Vitest
      },
    },
    rules: {
      // Regras recomendadas do Vitest
      ...vitestPlugin.configs.recommended.rules,

      // Regras adicionais
      "vitest/consistent-test-it": ["error", { fn: "it" }],
      "vitest/no-identical-title": "error",
    },
  },
];
