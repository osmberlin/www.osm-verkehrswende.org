import { astroPostsDefinition } from 'keystatic/postsAstro'
import { astroProjectsDefinition } from 'keystatic/projectsAstro'

export const collections = {
  projects: astroProjectsDefinition,
  posts: astroPostsDefinition,
}
