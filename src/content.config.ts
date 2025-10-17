import { astroPagesDefinition } from 'cms/pagesAstro'
import { astroPostsDefinition } from 'cms/postsAstro'
import { astroProjectsDefinition } from 'cms/projectsAstro'

export const collections = {
  pages: astroPagesDefinition,
  projects: astroProjectsDefinition,
  posts: astroPostsDefinition,
}
