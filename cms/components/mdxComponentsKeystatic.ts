import { CalloutKeystatic } from '@components/text/Callout.keystatic'
import { ImageKeystatic } from '@components/text/Image.keystatic'
import { VideoKeystatic } from '@components/text/Video.keystatic'
import { keystaticButtonConfig } from './Button/keystatic.button.config'
import { keystaticImageDoubleConfig } from './ImageDouble/keystatic.ImageDouble.config'
import { keystaticImageSingleHorizontalConfig } from './ImageSingleHorizontal/keystatic.ImageSingleHorizontal.config'
import { keystaticImageSingleSquareConfig } from './ImageSingleSquare/keystatic.ImageSingleSquare.config'
import { keystaticYouTubePreviewConfig } from './YoutubePreview/keystatic.youtubePreview.config'

export const mdxComponentsKeystatic = (imagePath: string) => {
  return {
    Video: VideoKeystatic,
    Callout: CalloutKeystatic,
    Image: ImageKeystatic,
    Button: keystaticButtonConfig,
    ImageSingleHorizontal: keystaticImageSingleHorizontalConfig(imagePath),
    ImageSingleSquare: keystaticImageSingleSquareConfig(imagePath),
    ImageDouble: keystaticImageDoubleConfig(imagePath),
    YouTubePreview: keystaticYouTubePreviewConfig(imagePath),
  }
}
