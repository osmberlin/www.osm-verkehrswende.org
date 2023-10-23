import { projectConfigs, type NavigationProjects } from 'src/projectConfigs.const'

export const pickProject = (astroUrl: string) => {
  const pathname = new URL(astroUrl).pathname

  const knownProjectFromPath = Object.keys(projectConfigs).find(
    (item) => item === pathname.split('/').at(1),
  )

  const project = (
    pathname === '/' ? 'about' : knownProjectFromPath ? knownProjectFromPath : 'unknown'
  ) as NavigationProjects

  return project
}
