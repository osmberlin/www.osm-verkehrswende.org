import Callout from '@components/text/Callout.astro'
import { CalloutKeystatic } from '@components/text/Callout.keystatic'
import Image from '@components/text/Image.astro'
import { ImageKeystatic } from '@components/text/Image.keystatic'
import Video from '@components/text/Video.astro'
import { VideoKeystatic } from '@components/text/Video.keystatic'

export const mdxComponentsKeystatic = {
  Video: VideoKeystatic,
  Callout: CalloutKeystatic,
  Image: ImageKeystatic,
}

export const mdxComponentsAstro = { Video, Callout, Image }
