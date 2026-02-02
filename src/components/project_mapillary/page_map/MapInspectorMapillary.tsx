import { useStore } from '@nanostores/react'
import { $searchParams, baseMapSearchparamsParse } from '../../BaseMap/store'
import { Link } from '../../Link/Link'
import { buildRoutePlanningUrl } from './routePlanningUrl'
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
  const mapLat = parsedParams.latitude ?? lat
  const mapLng = parsedParams.longitude ?? lng

  const mapillaryUrl = `https://www.mapillary.com/app/?lat=${lat}&lng=${lng}&z=${mapillaryZoom}&dateFrom=${mapillaryDateData.dateString}`
  const routePlanningUrl = buildRoutePlanningUrl({
    zoom: currentZoom,
    lat: mapLat,
    lng: mapLng,
    startLat: lat,
    startLng: lng,
  })

  return (
    <div className="prose prose-invert mb-4 max-w-none border-b-1 border-blue-200 pb-4 last:border-b-0">
      <h2 className="text-lg">Mapillary Street View</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to={mapillaryUrl}
          blank
          button
          className="inline-flex items-center"
          rel="noopener noreferrer"
        >
          In Mapillary öffnen
        </Link>
        <Link
          to={routePlanningUrl}
          blank
          button
          className="inline-flex items-center"
          rel="noopener noreferrer"
        >
          Routenplanung
        </Link>
      </div>
    </div>
  )
}
