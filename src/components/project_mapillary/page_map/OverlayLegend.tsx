import { $searchParams, baseMapSearchparamsParse } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { MAPILLARY_COLORS } from './colors'
import { FRESH_IMAGERY_ZOOM_LEVEL } from './MapSourceMapillary'
import type { SearchParamsMapillaryMap } from './storeMapillary'
import { useMapillaryDate } from './useMapillaryDate'

export const OverlayLegend = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap
  const mapillaryDateData = useMapillaryDate()

  // Check if we're zoomed in enough to show fresh imagery
  const mapParams = baseMapSearchparamsParse(params.map)
  const showFreshImagery = mapParams.zoom && mapParams.zoom > FRESH_IMAGERY_ZOOM_LEVEL

  return (
    <div className="px-2 py-4">
      <h3 className="mb-2 text-sm font-medium text-gray-900">Straßensegmente mit…</h3>
      <ul className="space-y-2 text-sm leading-4 font-normal text-gray-900">
        {/* Regular photos - always shown, grayed out in panorama-only mode */}
        <li
          className={twJoin(
            'items-top flex gap-2',
            params.anzeige === 'current_pano' ? 'text-gray-400' : '',
          )}
        >
          <div
            className="mt-1 h-2 w-7 rounded-full"
            style={{
              backgroundColor:
                params.anzeige === 'current_pano' ? 'lightgray' : MAPILLARY_COLORS.REGULAR,
            }}
          />
          <span>…ausreichend regulären Fotos</span>
        </li>

        {/* Panorama photos - always shown */}
        <li className="items-top flex gap-2">
          <div
            className="mt-1 h-2 w-7 rounded-full"
            style={{ backgroundColor: MAPILLARY_COLORS.PANO }}
          />
          <span>…ausreichend Panorama-Fotos</span>
        </li>

        {/* Missing photos - always shown */}
        <li className="items-top flex gap-2">
          <div
            className="mt-1 h-2 w-7 rounded-full"
            style={{ backgroundColor: MAPILLARY_COLORS.MISSING }}
          />
          <span>…fehlenden Fotos</span>
        </li>
        <li className="list-none">
          <details
            className={twJoin(
              'group max-w-60 leading-snug',
              showFreshImagery ? '' : 'text-gray-300',
            )}
          >
            <summary
              className={twJoin(
                'flex cursor-pointer list-none items-center gap-2 text-sm leading-4 text-gray-900',
                'hover:underline',
              )}
            >
              <div className="flex h-2 w-7 shrink-0 items-center" aria-hidden>
                <div
                  className="h-0 w-7 border-t-2 border-dashed"
                  style={{ borderColor: MAPILLARY_COLORS.REGULAR }}
                />
              </div>
              <span>
                …Fotos ab {mapillaryDateData ? mapillaryDateData.displayDate : '...'} | <u>Mehr…</u>
              </span>
            </summary>
            <div className="mt-2 text-sm text-gray-900">
              Diese Karte zeigt prozessierte Daten, die nur alle paar Wochen aktualisiert werden. Um
              zu bewerten, ob eine Straße immer noch frische Fotos benötigt, werden zusätzlich Daten
              direkt von Mapillary angezeigt. Die gestrichelten Linien zeigen Mapillary-Sequenzen,
              die nach dem {mapillaryDateData ? mapillaryDateData.displayDate : '...'} aufgenommen
              wurden.{' '}
              <a
                href="https://tilda-geo.de/docs/mapillary-coverage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Weitere Informationen
              </a>
            </div>
          </details>
        </li>
      </ul>
    </div>
  )
}
