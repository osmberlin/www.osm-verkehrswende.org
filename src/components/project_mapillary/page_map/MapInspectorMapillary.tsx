import { useStore } from '@nanostores/react'
import { $searchParams, baseMapSearchparamsParse } from '../../BaseMap/store'
import { Link } from '../../Link/Link'
import { useMapillaryDate } from './useMapillaryDate'

type Props = {
  clickCoordinates: { lng: number; lat: number }
}

export const MapInspectorMapillary = ({ clickCoordinates }: Props) => {
  const { lat, lng } = clickCoordinates
  const searchParams = useStore($searchParams)
  const mapillaryDateData = useMapillaryDate()

  // Don't render anything if we're still loading or there's an error
  if (!mapillaryDateData) {
    return null
  }

  // Get current zoom from search params and add 1
  const parsedParams = baseMapSearchparamsParse(searchParams.map)
  const currentZoom = parsedParams.zoom || 17
  const mapillaryZoom = Math.round(currentZoom + 1)

  // Create Mapillary URL
  const mapillaryUrl = `https://www.mapillary.com/app/?lat=${lat}&lng=${lng}&z=${mapillaryZoom}&dateFrom=${mapillaryDateData.dateString}`

  return (
    <div className="prose prose-invert mb-4 max-w-none border-b-1 border-blue-200 pb-4 last:border-b-0">
      <h2 className="text-lg">Mapillary Street View</h2>

      <div className="mt-4">
        <p className="mb-3 text-sm text-white/70">Öffne Mapillary Street View an dieser Position</p>

        <Link to={mapillaryUrl} blank button className="inline-flex items-center">
          In Mapillary öffnen
        </Link>
      </div>
    </div>
  )
}
