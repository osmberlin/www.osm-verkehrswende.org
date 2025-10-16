import { $searchParams, baseMapSearchparamsParse } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { MAPILLARY_COLORS } from './colors'
import { FRESH_IMAGERY_DATE, FRESH_IMAGERY_ZOOM_LEVEL } from './FreshMapillaryLayers'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export const OverlayLegend = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap

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
      </ul>

      {/* Fresh imagery - only shown when zoomed in */}
      <details
        className={twJoin('mt-2 max-w-60 leading-snug', showFreshImagery ? '' : 'text-gray-300')}
      >
        <summary
          className={twJoin('text-xs', showFreshImagery ? 'cursor-pointer hover:underline' : '')}
        >
          Gestrichelte Linien: Neuste Fotostrecken
        </summary>
        <div className="text-sm">
          Diese Karte zeigt prozessierte Daten, die nur alle paar Monate aktualisiert werden. Um zu
          bewerten, ob eine Straße immer noch frische Fotos benötigt, werden zusätzlich Daten direkt
          von Mapillary angezeigt. Die gestrichelten Linien zeigen Mapillary-Sequenzen, die nach dem{' '}
          {new Date(FRESH_IMAGERY_DATE).toLocaleDateString('de-DE')} aufgenommen wurden.
        </div>
      </details>
    </div>
  )
}
