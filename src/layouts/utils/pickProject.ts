import {
  projectToNavigation,
  type NavigationProjects,
} from '@layouts/Navigation/projectToNavigation.const'

export const pickProject = (astroUrl: string) => {
  const pathname = new URL(astroUrl).pathname

  const knownProjectFromPath = Object.keys(projectToNavigation).find(
    (item) => item === pathname.split('/').at(1),
  )

  const project = (
    pathname === '/' ? 'about' : knownProjectFromPath ? knownProjectFromPath : 'unknown'
  ) as NavigationProjects

  return project
}
