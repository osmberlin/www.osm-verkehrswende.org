import { fields } from '@keystatic/core'
import { wrapper } from '@keystatic/core/content-components'

export const ImageKeystatic = wrapper({
  label: 'Image',
  schema: {
    src: fields.text({ label: 'Image source', validation: { isRequired: true } }),
    alt: fields.text({ label: 'Alt attribute', validation: { isRequired: true } }),
    caption: fields.text({ label: 'Caption', validation: { isRequired: false } }),
    osm_urls: fields.array(fields.url({ label: 'OSM URL', validation: { isRequired: false } }), {
      label: 'OSM URLs',
      itemLabel: (props) => props.value || 'MISSING',
    }),
    mapillary_url: fields.url({ label: 'Mapillary URL', validation: { isRequired: false } }),
    strassenraumkarte_url: fields.url({
      label: 'Straßenraumkarte URL',
      validation: { isRequired: false },
    }),
  },
})
