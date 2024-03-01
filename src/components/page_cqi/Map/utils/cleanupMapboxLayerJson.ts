export const cleanupMapboxLayerJson = (id: string, input: Record<string, any>[]) => {
  const output = input[0] || {}
  delete output?.['source']
  delete output?.['source-layer']
  delete output?.['layout']?.['visibility']
  output.id = id
  return output
}
