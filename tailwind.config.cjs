/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/javascript/*.{js,ts}',
  ],
  theme: {
    extend: {
      zIndex: {
        1000: '1000',
      },
    },
  },
  corePlugins: {
    // Removes the opacity var() from Styles in order to get dev tools show the color.
    // https://twitter.com/adamwathan/status/1529596984235118595
    // https://tailwindcss.com/docs/configuration#core-plugins
    backdropOpacity: false, // The backdrop-opacity utilities like backdrop-opacity-50
    backgroundOpacity: false, // The background-color opacity utilities like bg-opacity-25
    borderOpacity: false, // The border-color opacity utilities like border-opacity-25
    divideOpacity: false, // The divide-opacity utilities like divide-opacity-50
    placeholderOpacity: false, // The placeholder color opacity utilities like placeholder-opacity-25
    ringOpacity: false, // The ring-opacity utilities like ring-opacity-50
    textOpacity: false, // The text-opacity utilities like text-opacity-50},
    // 'opacity': true,	// The opacity utilities like opacity-50
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
