import { fields } from '@keystatic/core'
import { wrapper } from '@keystatic/core/content-components'
import { languagesSelect } from 'keystatic/utils/languagesSelect'

export const CalloutKeystatic = wrapper({
  label: 'Callout',
  schema: {
    language: fields.select({
      label: 'Language',
      options: languagesSelect,
      defaultValue: languagesSelect.at(0)!.value,
    }),
  },
})
