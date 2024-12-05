import { config } from '@keystatic/core'
import { KEYSTATIC_STORAGE_KIND } from 'astro:env/client'
import { keystaticCampaignsConfig } from 'keystatic/campaignsKeystatic'
import { keystaticPostsConfig } from 'keystatic/postsKeystatic'
import { keystaticProjectsConfig } from 'keystatic/projectsKeystatic'

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
