import { config } from '@keystatic/core'
import { keystaticPostsConfig } from 'keystatic/keystatic.posts.config'
import { keystaticProjectsConfig } from 'keystatic/keystatic.projects.config'

export default config({
  storage: {
    kind: 'local',
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
