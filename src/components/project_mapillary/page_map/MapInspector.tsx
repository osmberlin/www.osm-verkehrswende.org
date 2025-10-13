import { $clickedMapData, $searchParams, baseMapSearchparamsParse } from '@components/BaseMap/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useStore } from '@nanostores/react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import React from 'react'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export const MapInspector: React.FC = () => {
  const clickedMapData = useStore($clickedMapData)
  const params = useStore($searchParams) as SearchParamsMapillaryMap

  if (!clickedMapData || !clickedMapData.length) return null

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

  return (
    <section className="absolute inset-x-1 bottom-1 z-50 max-h-[80vh] overflow-y-auto rounded-lg bg-blue-900 p-4 shadow-xl sm:inset-x-auto sm:inset-y-2.5 sm:right-2.5 sm:w-96">
      <button
        onClick={() => $clickedMapData.set(undefined)}
        className="absolute top-2.5 right-2.5 z-20 cursor-pointer rounded-full bg-white p-1.5 text-blue-900 hover:bg-blue-50 hover:shadow-lg"
      >
        <XMarkIcon className="size-5" />
        <span className="sr-only">Details ausblenden</span>
      </button>

      {clickedMapData
        .filter(
          (feature, index, self) =>
            index === self.findIndex((f) => f.properties.id === feature.properties.id),
        )
        .map((feature, index) => {
          const props = feature.properties
          // Handle different geometry types - for LineString, coordinates is an array of [lng, lat] pairs
          const coordinates =
            feature.geometry?.type === 'LineString'
              ? feature.geometry.coordinates[0] || [0, 0]
              : [0, 0]
          const [lng, lat] = coordinates

          return (
            <div
              key={props.id}
              className="prose prose-invert mb-4 max-w-none border-b-1 border-blue-200 pb-4 last:border-b-0"
            >
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
                        <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">
                          ID
                        </th>
                        <td className="py-1 text-xs">{props.id}</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">
                          Mapillary Coverage
                        </th>
                        <td className="py-1 text-xs">{props.mapillary_coverage || 'Keine'}</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">
                          Länge
                        </th>
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
                        <th className="py-1 pr-2 text-left text-xs font-medium text-white/70">
                          Changeset
                        </th>
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
        })}
    </section>
  )
}
