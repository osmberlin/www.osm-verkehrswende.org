import { fields } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'

export const VideoKeystatic = block({
  label: 'Video',
  schema: {
    src: fields.url({
      label: 'iframe video source URL',
      validation: { isRequired: true },
    }),
  },
  ContentView: (props) => {
    return (
      <>
        {props.value.src}{' '}
        <a href={props.value.src || undefined} target="_blank">
          Open
        </a>
      </>
    )
  },
})
