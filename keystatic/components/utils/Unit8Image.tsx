import { useEffect, useState } from 'react'

type Props = {
  data: any
}

export const Uint8Array = ({ data }: Props) => {
  const [imageUrl, setImageUrl] = useState<null | string>(null)

  useEffect(() => {
    const blob = new Blob([data], { type: 'image/jpeg' }) // Adjust the type if needed
    const url = URL.createObjectURL(blob)
    setImageUrl(url)

    // Clean up function to revoke the object URL
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [data])

  return imageUrl ? (
    <img
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        objectFit: 'cover',
      }}
      src={imageUrl}
      alt="Image Preview"
    />
  ) : null
}
