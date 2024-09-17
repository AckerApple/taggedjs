import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  ...tseslint.config({
    extends: [
      pluginJs.configs.recommended,
      // eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: { globals: globals.browser },
    ignores: [
      ".history/**",
      "dist/**",
      "js/**"
    ],
    files: ["ts/**/*.ts"],
    rules: {
      'no-prototype-builtins': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { 
          "argsIgnorePattern": "^_", // Ignore parameters starting with an underscore
          // "varsIgnorePattern": "^_", // Ignore variables starting with an underscore
        },
      ],
    },
  })
];