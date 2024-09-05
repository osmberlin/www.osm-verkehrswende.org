import type { TProjectConfig } from 'keystatic/keystatic.projects.config'

export const getRootUrl = (project: TProjectConfig) => {
  return project.externalProjektPage || `/${project.name.slug}`
}
