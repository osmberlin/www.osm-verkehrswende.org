export const projectKeyFromUrl = (astroUrl: string) => {
  const pathname = new URL(astroUrl).pathname
  if (pathname === '/') return 'root'
  return pathname.split('/').at(1)
}
