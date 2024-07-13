import eslintPluginAstro from 'eslint-plugin-astro'

// An alternative config would be https://github.com/withastro/docs/blob/main/.eslintrc.js
export default [
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
]
