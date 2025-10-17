import { fields } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'

export const keystaticYouTubePreviewConfig = (imagePath: string) =>
  block({
    label: 'YouTubePreview',
    schema: {
      link: fields.url({ label: 'YouTube Link', validation: { isRequired: true } }),
      previewImage: fields.image({
        label: 'Preview Image',
        validation: { isRequired: true },
        directory: `src/content/${imagePath}`,
        publicPath: `/src/content/${imagePath}`,
      }),
    },
    ContentView: (props) => {
      return <>{props.value.link}</>
    },
  })
