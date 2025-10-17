import { fields } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'
import { KeystaticPreview } from './KeystaticPreview'

export type ImageDoubleType = {
  src: string
  alt?: string
  caption?: string
  srcSecond: string
  altSecond?: string
  captionSecond?: string
  imageConfig:
    | {
        discriminant: 'vertical'
        value: '3/2' | '4/3'
      }
    | {
        discriminant: 'horizontal'
        value: '3/2' | '4/3'
      }
    | {
        discriminant: 'square'
      }
}

export const keystaticImageDoubleConfig = (imagePath: string) =>
  block({
    label: 'Bild: doppelt',
    description: 'quer / hoch / quadratisch',
    schema: {
      src: fields.image({
        label: '1. Bild',
        directory: `src/content/${imagePath}`,
        publicPath: `/src/content/${imagePath}`,
        validation: { isRequired: true },
      }),
      alt: fields.text({ label: '1. Bild: Alt-Text' }),
      caption: fields.text({
        label: '1. Bild: Bildunterschrift',
      }),
      srcSecond: fields.image({
        label: '2. Bild',
        directory: `src/content/${imagePath}`,
        publicPath: `/src/content/${imagePath}`,
        validation: { isRequired: true },
      }),
      altSecond: fields.text({ label: '2. Bild: Alt-Text' }),
      captionSecond: fields.text({
        label: '2. Bild: Bildunterschrift',
      }),
      imageConfig: fields.conditional(
        fields.select({
          label: 'Ausrichtung',
          description: '',
          options: [
            { label: 'quer', value: 'horizontal' },
            { label: 'hoch', value: 'vertical' },
            { label: 'quadratisch', value: 'square' },
          ],
          defaultValue: 'vertical',
        }),
        {
          vertical: fields.select({
            label: 'Seitenverhältnis',
            options: [
              { label: '3:2', value: '3/2' },
              { label: '4:3', value: '4/3' },
            ],
            defaultValue: '3/2',
          }),
          horizontal: fields.select({
            label: 'Seitenverhältnis',
            options: [
              { label: '3:2', value: '3/2' },
              { label: '4:3', value: '4/3' },
            ],
            defaultValue: '3/2',
          }),
          square: fields.empty(),
        },
      ),
    },
    ContentView: KeystaticPreview,
  })
