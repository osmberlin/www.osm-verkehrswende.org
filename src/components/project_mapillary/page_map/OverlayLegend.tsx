import { $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { MAPILLARY_COLORS } from './colors'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export const OverlayLegend = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap

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
    </div>
  )
}
