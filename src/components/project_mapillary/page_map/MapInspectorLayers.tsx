import { $searchParams, baseMapSearchparamsParse } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'
import type { SearchParamsMapillaryMap } from './storeMapillary'

type Props = {
  feature: MapGeoJSONFeature
}

export const MapInspectorLayers = ({ feature }: Props) => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, 'dd.MM.yyyy HH:mm', { locale: de })
    } catch {
      return dateString
    }
  }

  const getCurrentZoom = () => {
    const mapParams = baseMapSearchparamsParse(params.map)
    return mapParams.zoom || 15
  }

  const getMapillaryUrl = (lat: number, lng: number) => {
    const url = new URL('https://www.mapillary.com/app/')
    url.searchParams.append('lat', lat.toString())
    url.searchParams.append('lng', lng.toString())
    url.searchParams.append('z', getCurrentZoom().toString())
    url.searchParams.append('dateFrom', '2023-01-01')
    if (params?.anzeige === 'current_pano') {
      url.searchParams.append('panos', 'true')
    }
    return url.toString()
  }

  const props = feature.properties
  // Handle different geometry types - for LineString, coordinates is an array of [lng, lat] pairs
  const coordinates =
    feature.geometry?.type === 'LineString' ? feature.geometry.coordinates[0] || [0, 0] : [0, 0]
  const [lng, lat] = coordinates

  return (
    <div className="prose prose-invert mb-4 max-w-none border-b-1 border-blue-200 pb-4 last:border-b-0">
      <h2 className="text-lg">{props.road || 'Unbekannte Straße'}</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={`https://www.openstreetmap.org/${props.id}/history`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded bg-white/10 px-3 py-1.5 text-sm no-underline hover:bg-white/20"
        >
          OpenStreetMap
        </a>

        {props.changeset_id && (
          <a
            href={`https://www.openstreetmap.org/changeset/${props.changeset_id}#map=17/${lat}/${lng}&layers=N`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded bg-white/10 px-3 py-1.5 text-sm no-underline hover:bg-white/20"
          >
            Changeset
          </a>
        )}

        <a
          href={getMapillaryUrl(lat, lng)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded bg-white/10 px-3 py-1.5 text-sm no-underline hover:bg-white/20"
        >
          Mapillary
        </a>

        <a
          href={`https://tilda-geo.de/regionen/radinfra?map=${getCurrentZoom()}/${lat}/${lng}&config=pdqyyt.7h3d.am2gw&osmNotes=true&v=2`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded bg-white/10 px-3 py-1.5 text-sm no-underline hover:bg-white/20"
        >
          TILDA radinfra
        </a>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium">Mehr…</summary>
        <div className="mt-2">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-white/10">
                <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">ID</th>
                <td className="py-1 text-xs">{props.id}</td>
              </tr>
              <tr className="border-b border-white/10">
                <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">
                  Mapillary Coverage
                </th>
                <td className="py-1 text-xs">{props.mapillary_coverage || 'Keine'}</td>
              </tr>
              <tr className="border-b border-white/10">
                <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">Länge</th>
                <td className="py-1 text-xs">
                  {props.length ? `${props.length.toFixed(2)} km` : 'Unbekannt'}
                </td>
              </tr>
              <tr className="border-b border-white/10">
                <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">
                  Aktualisiert
                </th>
                <td className="py-1 text-xs">
                  {props.updated_at ? formatDateTime(props.updated_at) : 'Unbekannt'}
                </td>
              </tr>
              <tr>
                <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">Changeset</th>
                <td className="py-1 text-xs">{props.changeset_id || 'Unbekannt'}</td>
              </tr>
            </tbody>
          </table>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium">Debug</summary>
            <pre className="mt-2 overflow-x-auto rounded bg-black/20 p-2 text-xs">
              <code>{JSON.stringify(feature, null, 2)}</code>
            </pre>
          </details>
        </div>
      </details>
    </div>
  )
}
