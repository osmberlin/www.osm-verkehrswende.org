import { $searchParams, baseMapSearchparamsParse } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'

export const OverlayZoomMessage = () => {
  const params = useStore($searchParams)
  const mapParams = baseMapSearchparamsParse(params.map)
  const currentZoom = mapParams.zoom || 15

  // Only show message if zoom is below 9
  if (currentZoom >= 9) {
    return null
  }

  return (
    <div className="bg-yellow-50 px-4 py-2 text-xs text-gray-600">
      Daten sind ab Zoomstufe 9+ sichtbar.
    </div>
  )
}
