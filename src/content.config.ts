import { astroCampaignsDefinition } from 'keystatic/campaignsAstro'
import { astroPostsDefinition } from 'keystatic/postsAstro'
import { astroProjectsDefinition } from 'keystatic/projectsAstro'

export const collections = {
  projects: astroProjectsDefinition,
  posts: astroPostsDefinition,
  campaigns: astroCampaignsDefinition,
}
