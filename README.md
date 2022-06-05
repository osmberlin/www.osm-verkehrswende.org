# OpenStreetMap Parking

**[Learn more about the project](#TODO).**

# Development (project page)

- We use Jekyll to generate the pages – https://jekyllrb.com/
- We use Tailwind CSS in JIT mode to generate the css file – https://tailwindcss.com/docs/just-in-time-mode

## Installation

`npm install`

Will install Jekyll, Tailwind CSS and other required plugins.

## Development

`npm run dev`

~~Will run Tailwind CSS JIT in parallel with Jekyll. Both use live reloading.~~

- Livereloading has issues, see https://github.com/tailwindlabs/tailwindcss/discussions/8470
- We now use https://github.com/Qard/onchange to run the build commands
- And then serve the the generated `_site` manually with https://www.npmjs.com/package/serve
  - …which only works if the `_config` `sitebaseurl` is `/`

## Deploy

_Did CSS change?_

- _Yes, CSS did change?_ – Run `npm run build`, then commit changes to the `css/tailwind.css`.
- _No, CSS did not change?_ – Commit changes, Github pages will build and update the page.

## Useful links

- Jekyll template language reference – https://shopify.github.io/liquid/basics/introduction/ Liquid Template Language
- HTML to Markdown copy-paste https://euangoddard.github.io/clipboard2markdown/
- Google Doc/Word to HTML-Table copy-paste https://www.gdoctohtml.com/
