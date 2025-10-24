import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": ["warn"],
      "semi": ["warn", "always"],
      "quotes": ["warn", "double"],
    }
  },
  {
    ignores: ["dist/*", "build/*", "node_modules/*", "client/*", "poc/*", "tests/*"], // Excluded directories
  }
];
