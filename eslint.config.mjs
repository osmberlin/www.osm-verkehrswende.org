import eslintPluginAstro from 'eslint-plugin-astro'
import reactCompiler from 'eslint-plugin-react-compiler'
import tsParser from '@typescript-eslint/parser'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
]
