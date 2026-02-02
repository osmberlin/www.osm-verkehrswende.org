import { $searchParams, baseMapSearchparamsParse } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { MAPILLARY_COLORS } from './colors'
import { FRESH_IMAGERY_ZOOM_LEVEL } from './MapSourceMapillary'
import type { SearchParamsMapillaryMap } from './storeMapillary'

const showFreshLayer = (params: SearchParamsMapillaryMap) => params?.freshLayer !== 'off'

function toggleFreshLayer(params: SearchParamsMapillaryMap) {
  const next = showFreshLayer(params) ? 'off' : 'on'
  $searchParams.open({ ...params, freshLayer: next })
}

export const OverlayLegend = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap

  const mapParams = baseMapSearchparamsParse(params.map)
  const showFreshImagery = mapParams.zoom && mapParams.zoom > FRESH_IMAGERY_ZOOM_LEVEL

  return (
    <div className="px-2 py-4">
      <h3 className="mb-2 text-sm font-medium text-gray-900">Straßensegmente mit…</h3>
      <ul className="flex flex-col gap-1.5 text-sm leading-4 font-normal text-gray-900">
        {/* Regular photos - always shown, grayed out in panorama-only mode */}
        <li
          className={twJoin(
            'flex min-h-5 items-center gap-2',
            params.anzeige === 'current_pano' ? 'text-gray-400' : '',
          )}
        >
          <div
            className="h-2 w-7 shrink-0 rounded-full"
            style={{
              backgroundColor:
                params.anzeige === 'current_pano' ? 'lightgray' : MAPILLARY_COLORS.REGULAR,
            }}
          />
          <span>…ausreichend regulären Fotos</span>
        </li>

        {/* Panorama photos - always shown */}
        <li className="flex min-h-5 items-center gap-2">
          <div
            className="h-2 w-7 shrink-0 rounded-full"
            style={{ backgroundColor: MAPILLARY_COLORS.PANO }}
          />
          <span>…ausreichend Panorama-Fotos</span>
        </li>

        {/* Missing photos - always shown */}
        <li className="flex min-h-5 items-center gap-2">
          <div
            className="h-2 w-7 shrink-0 rounded-full"
            style={{ backgroundColor: MAPILLARY_COLORS.MISSING }}
          />
          <span>…fehlenden Fotos</span>
        </li>

        {/* Neuste Mapillary Fotos – dashed line, toggle via light-bulb like CQI */}
        <li
          className={twJoin(
            'flex min-h-5 cursor-pointer items-center justify-between gap-2',
            !showFreshImagery && 'text-gray-300',
          )}
          onClick={() => toggleFreshLayer(params)}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-2 w-7 shrink-0 items-center" aria-hidden>
              <div
                className="h-0 w-7 border-t-2 border-dashed"
                style={{ borderColor: MAPILLARY_COLORS.REGULAR }}
              />
            </div>
            <span className={twJoin('truncate', !showFreshLayer(params) && 'line-through')}>
              Neuste Mapillary Fotos
            </span>
          </div>
          <button
            type="button"
            className={twJoin(
              'shrink-0 rounded border border-white p-1 transition-colors hover:border-gray-200 hover:bg-blue-50 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/75',
              showFreshLayer(params) ? 'text-yellow-500' : 'text-gray-300',
            )}
            onClick={(e) => {
              e.stopPropagation()
              toggleFreshLayer(params)
            }}
            aria-label={
              showFreshLayer(params)
                ? 'Mapillary Sequenzen ausblenden'
                : 'Mapillary Sequenzen anzeigen'
            }
          >
            {showFreshLayer(params) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                <path
                  fillRule="evenodd"
                  d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            )}
          </button>
        </li>
      </ul>
    </div>
  )
}
