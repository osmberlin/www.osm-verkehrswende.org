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
      config: {
        // https://github.com/withastro/astro/tree/main/packages/integrations/tailwind#configapplybasestyles
        applyBaseStyles: false,
      },
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
  experimental: { redirects: true },
  redirects: {
    // '/from': '/to',
  },
})
