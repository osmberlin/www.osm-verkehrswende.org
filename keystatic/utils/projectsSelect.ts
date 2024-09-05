import { extractedProjectKeys } from 'keystatic/extractedProjectKeys'

// We cannot show the project name here, easily. See keystatic/scripts/README.md for more.
export const projectsSelect = extractedProjectKeys
  .map((key) => {
    return {
      label: key,
      value: key,
    }
  })
  .filter(Boolean)
