import { CalloutKeystatic } from '@components/text/Callout.keystatic'
import { ImageKeystatic } from '@components/text/Image.keystatic'
import { VideoKeystatic } from '@components/text/Video.keystatic'
import { keystaticImageDoubleConfig } from './ImageDouble/keystatic.ImageDouble.config'
import { keystaticImageSingleHorizontalConfig } from './ImageSingleHorizontal/keystatic.ImageSingleHorizontal.config'
import { keystaticImageSingleSquareConfig } from './ImageSingleSquare/keystatic.ImageSingleSquare.config'

export const mdxComponentsKeystatic = (imagePath: string) => {
  return {
    Video: VideoKeystatic,
    Callout: CalloutKeystatic,
    Image: ImageKeystatic,
    ImageSingleHorizontal: keystaticImageSingleHorizontalConfig(imagePath),
    ImageSingleSquare: keystaticImageSingleSquareConfig(imagePath),
    ImageDouble: keystaticImageDoubleConfig(imagePath),
  }
}
