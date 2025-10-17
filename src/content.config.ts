import { astroPostsDefinition } from 'cms/postsAstro'
import { astroProjectsDefinition } from 'cms/projectsAstro'

export const collections = {
  projects: astroProjectsDefinition,
  posts: astroPostsDefinition,
}
