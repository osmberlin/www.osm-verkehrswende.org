import { $clickedMapData, $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { Layer, Source } from 'react-map-gl/maplibre'
import { MAPILLARY_COLORS } from './colors'
import { BEFORE_CITY_LABELS } from './constants'
import type { SearchParamsMapillaryMap } from './storeMapillary'

const ATTRIBUTION =
  "© OpenStreetMap, <a href='https://tilda-geo.de/regionen/radinfra'>tilda-geo.de</a>; © Mapillary"

const LINE_WIDTH = 4
const LINE_WIDTH_THIN = 2.2
const LINE_WIDTH_MIN = 1.1

export type MapSource = {
  id: string
  tiles: string[]
  sourceLayer: string
  lineWidth: number
  roadPropertyExclude?: string[] // Exclude these road types
  roadPropertyAllow?: string[] // Only show these road types
}

export const mapSources: MapSource[] = [
  {
    id: 'roads',
    tiles: ['https://tiles.tilda-geo.de/atlas_generalized_roads/{z}/{x}/{y}'],
    sourceLayer: 'roads',
    lineWidth: LINE_WIDTH,
    roadPropertyExclude: ['service_road'],
  },
  {
    id: 'road-path-classes',
    tiles: ['https://tiles.tilda-geo.de/atlas_generalized_roadspathclasses/{z}/{x}/{y}'],
    sourceLayer: 'roadsPathClasses',
    lineWidth: LINE_WIDTH_THIN,
  },
  {
    id: 'bikelanes',
    tiles: ['https://tiles.tilda-geo.de/atlas_generalized_bikelanes/{z}/{x}/{y}'],
    sourceLayer: 'bikelanes',
    lineWidth: LINE_WIDTH_THIN,
    roadPropertyAllow: ['cycleway', 'cycleway_crossing'],
  },
]

export const MapSourceLayers = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap
  const mapData = useStore($clickedMapData)
  const mapDataIds = mapData?.features?.map((feature) => feature.properties?.id) ?? []

  return (
    <>
      {mapSources.map((source) => (
        <Source
          key={source.id}
          id={source.id}
          type="vector"
          tiles={source.tiles}
          attribution={ATTRIBUTION}
        >
          <Layer
            key="selected"
            id="selected"
            source={source.id}
            source-layer={source.sourceLayer}
            type="line"
            beforeId={BEFORE_CITY_LABELS}
            paint={{
              'line-color': '#125767',
              'line-width': source.lineWidth * 3,
              'line-blur': 0,
              'line-opacity': 0.9,
            }}
            filter={['in', 'id', ...mapDataIds]}
          />

          {/* Single layer with conditional colors */}
          <Layer
            id={`${source.id}-coverage`}
            source={source.id}
            source-layer={source.sourceLayer}
            type="line"
            beforeId={BEFORE_CITY_LABELS}
            paint={{
              'line-color':
                params?.anzeige === 'current_pano'
                  ? [
                      'case',
                      ['==', ['get', 'mapillary_coverage'], 'pano'],
                      MAPILLARY_COLORS.PANO,
                      MAPILLARY_COLORS.MISSING,
                    ]
                  : [
                      'case',
                      ['==', ['get', 'mapillary_coverage'], 'pano'],
                      MAPILLARY_COLORS.PANO,
                      ['==', ['get', 'mapillary_coverage'], 'regular'],
                      MAPILLARY_COLORS.REGULAR,
                      MAPILLARY_COLORS.MISSING,
                    ],
              'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                11,
                LINE_WIDTH_MIN,
                14,
                source.lineWidth,
              ],
              'line-opacity': 0.9,
            }}
            filter={[
              'all',
              // Only show at zoom 9 and above (11 for road-path-classes)
              source.id === 'road-path-classes' ? ['>=', ['zoom'], 11] : ['>=', ['zoom'], 9],
              // Exclude road types (exclude list)
              source?.roadPropertyExclude?.length && source.roadPropertyExclude.length > 0
                ? ['!', ['in', ['get', 'road'], ['literal', source.roadPropertyExclude]]]
                : ['literal', true],
              // Only include road types (allow list)
              source?.roadPropertyAllow?.length && source.roadPropertyAllow.length > 0
                ? ['in', ['get', 'road'], ['literal', source.roadPropertyAllow]]
                : ['literal', true],
            ]}
          />
        </Source>
      ))}
    </>
  )
}
