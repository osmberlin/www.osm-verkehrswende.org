/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 100,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
