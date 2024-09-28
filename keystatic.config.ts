import { config } from '@keystatic/core'
import { keystaticCampaignsConfig } from 'keystatic/keystatic.campaigns.config'
import { keystaticPostsConfig } from 'keystatic/keystatic.posts.config'
import { keystaticProjectsConfig } from 'keystatic/keystatic.projects.config'

export default config({
  storage: {
    // https://keystatic.com/docs/github-mode#setting-up-git-hub-mode
    kind: import.meta.env.PUBLIC_ASTRO_STORAGE_KIND,
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
      Kampagnen: ['campaigns'],
    },
  },
  collections: {
    posts: keystaticPostsConfig,
    campaigns: keystaticCampaignsConfig,
  },
  singletons: {
    projects: keystaticProjectsConfig,
  },
})
