import { fields } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'
import { KeystaticPreview } from './KeystaticPreview'

export type ImageSingleHorizontal = {
  src: string
  alt?: string
  caption?: string
  imageConfig:
    | {
        discriminant: '3/2'
        value:
          | {
              discriminant: 'half'
              value: 'left' | 'center' | 'right'
            }
          | {
              discriminant: 'full'
            }
      }
    | {
        discriminant: '4/3'
        value:
          | {
              discriminant: 'half'
              value: 'left' | 'center' | 'right'
            }
          | {
              discriminant: 'full'
            }
      }
    | {
        discriminant: '9/4'
      }
    | {
        discriminant: 'pano'
      }
}

export const keystaticImageSingleHorizontalConfig = (imagePath: string) =>
  block({
    label: 'Bild: einzeln, Querformat',
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
          label: 'Seitenverhältnis',
          description:
            'Breite Formate (16:9 und 9:4) werden immer über die ganze Breite dargestellt.',
          options: [
            { label: '3:2', value: '3/2' },
            { label: '4:3', value: '4/3' },
            { label: '9:4', value: '9/4' },
            { label: '16:9', value: 'pano' },
          ],
          defaultValue: '4/3',
        }),
        {
          '3/2': fields.conditional(
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
          '4/3': fields.conditional(
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
          '9/4': fields.empty(),
          pano: fields.empty(),
        },
      ),
    },
    ContentView: KeystaticPreview,
  })
