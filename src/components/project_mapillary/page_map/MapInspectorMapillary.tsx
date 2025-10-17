import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useStore } from '@nanostores/react'
import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'
import { $searchParams, baseMapSearchparamsParse } from '../../BaseMap/store'
import { FRESH_IMAGERY_DATE } from './MapSourceMapillary'

type Props = {
  feature: MapGeoJSONFeature
  clickCoordinates: { lng: number; lat: number }
}

export const MapInspectorMapillary = ({ feature, clickCoordinates }: Props) => {
  const { lat, lng } = clickCoordinates
  const searchParams = useStore($searchParams)

  // Convert timestamp to YYYY-MM-DD format for Mapillary
  const dateFrom = new Date(FRESH_IMAGERY_DATE).toISOString().split('T')[0]

  // Get current zoom from search params and add 1
  const parsedParams = baseMapSearchparamsParse(searchParams.map)
  const currentZoom = parsedParams.zoom || 17
  const mapillaryZoom = Math.round(currentZoom + 1)

  // Create Mapillary URL
  const mapillaryUrl = `https://www.mapillary.com/app/?lat=${lat}&lng=${lng}&z=${mapillaryZoom}&dateFrom=${dateFrom}`

  return (
    <div className="prose prose-invert mb-4 max-w-none border-b-1 border-blue-200 pb-4 last:border-b-0">
      <h2 className="text-lg">Mapillary Street View</h2>

      <div className="mt-4">
        <p className="mb-3 text-sm text-white/70">Öffne Mapillary Street View an dieser Position</p>

        <a
          href={mapillaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          In Mapillary öffnen
        </a>
      </div>
    </div>
  )
}
