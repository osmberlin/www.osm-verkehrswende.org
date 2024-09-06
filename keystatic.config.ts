import { config } from '@keystatic/core'
import { keystaticPostsConfig } from 'keystatic/keystatic.posts.config'
import { keystaticProjectsConfig } from 'keystatic/keystatic.projects.config'

// See ./astro.config.mjs
import { loadEnv } from 'vite'
const { ASTRO_STORAGE_KIND } = loadEnv(process.env.NODE_ENV!, process.cwd(), '')

export default config({
  storage: {
    // https://keystatic.com/docs/github-mode#setting-up-git-hub-mode
    // @ts-expect-error
    kind: ASTRO_STORAGE_KIND,
    repo: {
      owner: 'osmberlin',
      name: 'www.osm-verkehrswende.org',
    },
  },
  ui: {
    brand: {
      name: 'OSM',
      // mark: () => <img src="/logo.png" height={27} />,
    },
    navigation: {
      Meta: ['projects'],
      Blog: ['posts'],
    },
  },
  collections: {
    posts: keystaticPostsConfig,
  },
  singletons: {
    projects: keystaticProjectsConfig,
  },
})
