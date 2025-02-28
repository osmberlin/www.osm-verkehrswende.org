import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import keystatic from '@keystatic/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'
import path from 'path'
import remarkToc from 'remark-toc'
import { watchAndRun } from 'vite-plugin-watch-and-run'

// ABOUT:
// We have to fetch settings from `.env`
// Which we have to do manually, see https://docs.astro.build/en/guides/configuring-astro/#environment-variables
//
// USAGE:
// `npm run dev` uses hybrid mode and keystatic()
// `npm run build` (server) is based on .env and has different settings for Netlify (CMS/Keystatic) vs. Github Pages (Static site)
// `npm run build:local && npm run serve` overwrites the .env settings to have a local test case for what is on Github Pages
import { loadEnv } from 'vite'
const { ASTRO_OUTPUT_MODE, ASTRO_USE_NETLIFY_ADAPTER } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  '',
)

// CONFIG:
// https://astro.build/config
export default defineConfig({
  site: 'https://www.osm-verkehrswende.org/',
  integrations: [
    ASTRO_OUTPUT_MODE === 'static' ? undefined : keystatic(),
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('README/'),
    }),
  ],
  // On Netlify and during development we use `hybrid`, on Github Pages we usd `static`.
  // Using static makes sure features like Astros redirecting work as expected.
  // Docs https://docs.astro.build/en/basics/rendering-modes/
  output: ASTRO_OUTPUT_MODE,
  adapter: ASTRO_USE_NETLIFY_ADAPTER === 'true' ? netlify() : undefined,
  redirects: {
    '/mapswipe': '/crowdmap',
    '/crowdmap': 'https://www.osm-berlin.org/crowdmap/',
    '/crowdmap/xhain': 'https://www.osm-berlin.org/crowdmap/xhain/',
    '/crowdmap/posts/2024-01-20-crowdmap/':
      'https://www.osm-berlin.org//crowdmap/posts/2024-01-20-crowdmap/',
    '/about': '/root',
    '/traffic-signs/campaigns/': 'https://radinfra.de/kampagnen/',
    '/traffic-signs/campaigns/missing_acccess_tag_bicycle_road/':
      'https://radinfra.de/kampagnen/missing_access_tag_bicycle_road/',
    '/traffic-signs/campaigns/missing_traffic_sign_vehicle_destination/':
      'https://radinfra.de/kampagnen/missing_traffic_sign_vehicle_destination/',
    '/traffic-signs/campaigns/missing_traffic_sign_244/':
      'https://radinfra.de/kampagnen/missing_traffic_sign_244/',
  },
  experimental: {
    // https://docs.astro.build/en/reference/experimental-flags/svg/
    svg: true,
  },
  markdown: { remarkPlugins: [remarkToc] },
  vite: {
    ssr: { noExternal: ['route-snapper'] },
    optimizeDeps: { exclude: ['route-snapper'] },
    plugins: [
      tailwindcss(),
      // See keystatic/scripts/README.md
      watchAndRun([
        {
          name: 'extract-project-keys',
          watchKind: ['change'],
          watch: path.resolve('src/content/projects/index.json'),
          run: 'npm run extract-project-keys',
          delay: 300,
        },
      ]),
    ],
  },
  env: {
    schema: {
      ASTRO_OUTPUT_MODE: envField.enum({
        values: ['static', 'hybrid', 'server'],
        access: 'secret',
        context: 'server',
        optional: false,
      }),
      ASTRO_USE_NETLIFY_ADAPTER: envField.boolean({
        access: 'secret',
        context: 'server',
        optional: false,
      }),
      KEYSTATIC_STORAGE_KIND: envField.enum({
        values: ['local', 'github'],
        access: 'public',
        context: 'client',
        optional: false,
      }),
      ASTRO_ENV: envField.enum({
        values: ['development', 'staging', 'production'],
        access: 'public',
        context: 'client',
        optional: false,
      }),
    },
  },
})
