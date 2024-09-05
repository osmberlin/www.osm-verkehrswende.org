import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import keystatic from '@keystatic/astro'
import { defineConfig } from 'astro/config'
import path from 'path'
import remarkToc from 'remark-toc'
import { watchAndRun } from 'vite-plugin-watch-and-run'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [
    tailwind({
      // https://github.com/withastro/astro/tree/main/packages/integrations/tailwind#applybasestyles
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('README/'),
    }),
    keystatic(),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
  },
  site: 'https://www.osm-verkehrswende.org/',
  redirects: {
    '/mapswipe': '/crowdmap',
    '/about': '/root',
  },
  vite: {
    ssr: {
      noExternal: ['route-snapper'],
    },
    optimizeDeps: {
      exclude: ['route-snapper'],
    },
    plugins: [
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
})
