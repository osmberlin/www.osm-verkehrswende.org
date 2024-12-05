import type { TProjectConfig } from 'keystatic/projectsAstro'

export const getRootUrl = (project: TProjectConfig) => {
  return project.externalProjektPage || `/${project.name.slug}`
}
