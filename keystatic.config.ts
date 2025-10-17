import { config } from '@keystatic/core'
import { KEYSTATIC_STORAGE_KIND } from 'astro:env/client'
import { keystaticPagesConfig } from 'cms/pagesKeystatic'
import { keystaticPostsConfig } from 'cms/postsKeystatic'
import { keystaticProjectsConfig } from 'cms/projectsKeystatic'

export default config({
  storage: {
    // https://keystatic.com/docs/github-mode#setting-up-git-hub-mode
    kind: KEYSTATIC_STORAGE_KIND,
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
      Pages: ['pages'],
      Blog: ['posts'],
    },
  },
  collections: {
    pages: keystaticPagesConfig,
    posts: keystaticPostsConfig,
  },
  singletons: {
    projects: keystaticProjectsConfig,
  },
})
