import { fields } from '@keystatic/core'
import { wrapper } from '@keystatic/core/content-components'
import { languagesSelect } from 'cms/utils/languagesSelect'

export const CalloutKeystatic = wrapper({
  label: 'Callout',
  schema: {
    language: fields.select({
      label: 'Language',
      options: languagesSelect,
      defaultValue: languagesSelect.at(0)!.value,
    }),
    color: fields.select({
      label: 'Color',
      options: [
        { label: 'Yellow', value: 'yellow' },
        { label: 'Green', value: 'green' },
      ],
      defaultValue: 'yellow',
    }),
  },
})
