import tseslint from 'typescript-eslint';

// Only rules without an equivalent in the pinned Biome version remain here.
export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      'no-invalid-regexp': 'error',
      'no-unexpected-multiline': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tseslint.parser },
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
    },
  },
);
