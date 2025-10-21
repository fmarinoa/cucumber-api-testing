export default [
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      'commitlint.config.ts',
      'eslint.config.ts',
    ],
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {},
  },
]
