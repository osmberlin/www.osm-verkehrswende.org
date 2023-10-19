import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import remarkToc from 'remark-toc'

// https://astro.build/config
export default defineConfig({
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
  ],
  markdown: {
    remarkPlugins: [remarkToc],
  },
  site: 'https://www.osm-verkehrswende.org/',
  redirects: {
    // '/from': '/to',
  },
})
