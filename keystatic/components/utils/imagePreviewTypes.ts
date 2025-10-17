// I did not manage to extract the type form `block`>`ContentView`, so this is a copy
export type ImagePreviewType = {
  value: {
    readonly src: {
      data: Uint8Array
      extension: string
      filename: string
    } | null
    readonly caption?: string
  }
}
