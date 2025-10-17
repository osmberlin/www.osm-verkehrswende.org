// Learn more:
// 1. https://keystatic.com/docs/recipes/astro-images#content-component-images
// 2. https://docs.astro.build/en/recipes/dynamically-importing-images/

export const getImage = (src: string) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/content/**/*.{jpeg,jpg,png,gif,webp,JPG,JPEG,PNG,GIF}',
  )
  if (!images[src]) {
    throw new Error(`"${src}" does not exist in glob /src/content/*`)
  }

  return images[src]()
}
