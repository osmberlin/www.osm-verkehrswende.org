import { getEntry } from 'astro:content'

export const getProjects = async () => {
  const projects = await getEntry('projects', 'index')

  return projects?.data.projects
}
