import { fields } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'
import { KeystaticPreview } from './KeystaticPreview'

export type ImageSingleSquare = {
  src: string
  alt?: string
  caption?: string
  imageConfig:
    | {
        discriminant: 'half'
        value: 'center' | 'right' | 'left'
      }
    | {
        discriminant: 'full'
      }
}

export const keystaticImageSingleSquareConfig = (imagePath: string) =>
  block({
    label: 'Bild: einzeln, quadratisch',
    schema: {
      src: fields.image({
        label: 'Bild',
        directory: `src/content/${imagePath}`,
        publicPath: `/src/content/${imagePath}`,
        validation: { isRequired: true },
      }),
      caption: fields.text({
        label: 'Bildunterschrift',
      }),
      alt: fields.text({ label: 'Alt-Text' }),
      imageConfig: fields.conditional(
        fields.select({
          label: 'Breite',
          description:
            'Wieviel Platz soll das Bild im Verhältnis zur Breite des ganzen Textblocks einnehmen? Auf mobilen Screens wird immer die ganze Breite genommen.',
          options: [
            { label: 'halbe Breite', value: 'half' },
            { label: 'ganze Breite', value: 'full' },
          ],
          defaultValue: 'full',
        }),
        {
          half: fields.select({
            label: 'Position',
            options: [
              { label: 'links', value: 'left' },
              { label: 'zentriert', value: 'center' },
              { label: 'rechts', value: 'right' },
            ],
            defaultValue: 'left',
          }),
          full: fields.empty(),
        },
      ),
    },
    ContentView: KeystaticPreview,
  })
