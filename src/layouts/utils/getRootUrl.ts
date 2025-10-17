import type { TProjectConfig } from 'cms/projectsAstro'

export const getRootUrl = (project: TProjectConfig) => {
  return project.externalProjektPage || `/${project.name.slug}`
}
