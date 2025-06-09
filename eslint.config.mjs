import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(["**/dist", "**/examples", "**/node_modules", "**/website"]),
  {
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
      ),
    ),

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },

      "import/extensions": [".js", ".jsx", ".ts", ".tsx"],

      "import/parsers": {
        "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
      },

      "import/resolver": {
        typescript: true,
      },
    },

    rules: {
      "import/no-unresolved": [
        "error",
        {
          commonjs: true,
          amd: true,
        },
      ],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
    },
  },
  {
    files: ["./*.js"],

    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    ignores: ["**/dist", "**/examples", "**/node_modules", "**/website"],
  },
]);
