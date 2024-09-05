import { getEntry } from 'astro:content'
import { projectKeyFromUrl } from './projectKeyFromUrl'

export const getProject = async (astroUrl: string) => {
  const projects = await getEntry('projects', 'index')

  const projectSlugFromPath = projectKeyFromUrl(astroUrl)

  const project = projects.data.projects.find((p) => p.name.slug === projectSlugFromPath)

  if (!project) {
    console.warn('WARNING: getProject did not find any project for path ', astroUrl)
    return projects.data.projects.find((p) => p.name.slug === 'unknown')!
  }

  return project
}
