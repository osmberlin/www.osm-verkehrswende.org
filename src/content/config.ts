import { astroCampaignsDefinition } from 'keystatic/keystatic.campaigns.config'
import { astroPostsDefinition } from 'keystatic/keystatic.posts.config'
import { astroProjectsDefinition } from 'keystatic/keystatic.projects.config'

export const collections = {
  projects: astroProjectsDefinition,
  posts: astroPostsDefinition,
  campaigns: astroCampaignsDefinition,
}
