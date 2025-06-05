// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    // Ajuste regras específicas, ex:
    // "@typescript-eslint/no-explicit-any": "warn",
    // "prettier/prettier": ["error", { "singleQuote": true }]
  }
};
