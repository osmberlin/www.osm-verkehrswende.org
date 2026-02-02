import { useStore } from '@nanostores/react'
import type { FilterSpecification } from 'maplibre-gl'
import { Layer, Source } from 'react-map-gl/maplibre'
import { $searchParams } from '../../BaseMap/store'
import { MAPILLARY_COLORS } from './colors'
import { BEFORE_CITY_LABELS } from './constants'
import type { SearchParamsMapillaryMap } from './storeMapillary'
import { useMapillaryDate } from './useMapillaryDate'

const LINE_WIDTH_THIN = 2.2

// Shared zoom level for fresh imagery
export const FRESH_IMAGERY_ZOOM_LEVEL = 14

// https://www.mapillary.com/dashboard/developers
export const MAPILLARY_API_KEY = 'MLY|25685938474328402|b27ce963d08801bc87bcda87d2d6481b'

// Interactive layer IDs for Mapillary
export const MAPILLARY_INTERACTIVE_LAYERS = [
  'mapillary-fresh-lines',
  'mapillary-fresh-click-target',
]

export const MapSourceMapillary = () => {
  const mapillaryDateData = useMapillaryDate()
  const params = useStore($searchParams) as SearchParamsMapillaryMap

  // Don't render anything if we're still loading or there's an error
  if (!mapillaryDateData) {
    return null
  }

  // Hide fresh layer when URL has freshLayer=off
  if (params?.freshLayer === 'off') {
    return null
  }

  // Build base filter
  const baseFilter: FilterSpecification = [
    'all',
    // Only show at zoom 14 and above
    ['>=', ['zoom'], FRESH_IMAGERY_ZOOM_LEVEL],
    // Only show imagery captured after the fresh date
    ['>', ['get', 'captured_at'], mapillaryDateData.timestamp],
  ]

  // Add panorama filter if in panorama-only mode
  const freshImageryFilter: FilterSpecification =
    params?.anzeige === 'current_pano'
      ? [...baseFilter, ['==', ['get', 'is_pano'], true]]
      : baseFilter

  return (
    <Source
      id="mapillary-fresh"
      type="vector"
      tiles={[
        `https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=${MAPILLARY_API_KEY}`,
      ]}
      minzoom={0}
      maxzoom={FRESH_IMAGERY_ZOOM_LEVEL}
      attribution="© Mapillary"
      promoteId="id"
    >
      {/* Invisible click target layer - 4px wide */}
      <Layer
        id="mapillary-fresh-click-target"
        type="line"
        source="mapillary-fresh"
        source-layer="sequence"
        beforeId={BEFORE_CITY_LABELS}
        paint={{
          'line-width': 4,
          'line-opacity': 0, // Completely invisible
        }}
        filter={freshImageryFilter}
      />

      {/* Fresh imagery lines - only show after zoom 14+ */}
      <Layer
        id="mapillary-fresh-lines"
        type="line"
        source="mapillary-fresh"
        source-layer="sequence"
        beforeId={BEFORE_CITY_LABELS}
        paint={{
          'line-color': [
            'case',
            ['==', ['get', 'is_pano'], true],
            MAPILLARY_COLORS.PANO, // Blue for panoramic sequences
            MAPILLARY_COLORS.REGULAR, // Lighter blue for regular sequences
          ],
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            11,
            LINE_WIDTH_THIN * 0.7,
            14,
            LINE_WIDTH_THIN * 0.7,
          ],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 14, 0.6, 16, 0.8, 18, 0.9],
          'line-dasharray': [2, 2], // Dotted line pattern
        }}
        filter={freshImageryFilter}
      />
    </Source>
  )
}
