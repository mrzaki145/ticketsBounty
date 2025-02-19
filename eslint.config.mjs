import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const rules = {
  // "simple-import-sort/exports": "error",
  // "simple-import-sort/imports": "error",
  "unicorn/no-array-callback-reference": "off",
  "unicorn/no-array-for-each": "off",
  "unicorn/no-array-reduce": "off",
  "unicorn/prefer-ternary": "off",
  "unicorn/no-document-cookie": "off",
  "unicorn/prevent-abbreviations": [
    "error",
    {
      allowList: {
        e2e: true,
      },
      replacements: {
        props: false,
        ref: false,
        params: false,
      },
    },
  ],
};

const overrides = [
  {
    files: ["*.js"],
    rules: {
      "unicorn/prefer-module": "off",
    },
  },
];

const config = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
    "plugin:playwright/recommended"
    // "plugin:prettier/recommended"
    // 'simple-import-sort',
  ),
  {
    rules,
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"], // Apply rules to these file types
  },
  ...overrides,
];

export default config;
