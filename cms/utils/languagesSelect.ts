import { languages } from '@layouts/languages'

export const languagesSelect = languages
  .map((languageName) => {
    return {
      label: languageName,
      value: languageName,
    }
  })
  .filter(Boolean)
