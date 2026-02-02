import { $clickedMapData, $searchParams } from '@components/BaseMap/store'
import type { FilterSpecification } from 'maplibre-gl'
import { useStore } from '@nanostores/react'
import { Layer, Source } from 'react-map-gl/maplibre'
import { MAPILLARY_COLORS } from './colors'
import { BEFORE_CITY_LABELS } from './constants'
import type { FortbewegungMode, SearchParamsMapillaryMap } from './storeMapillary'

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
}

export type SourceRoadFilter = {
  roadPropertyExclude?: string[]
  roadPropertyAllow?: string[]
}

/** Per mode: which source ids to render, and for each source which road filters to apply. */
export const fortbewegungConfig: Record<
  FortbewegungMode,
  { sourceIds: string[]; sourceFilters: Partial<Record<string, SourceRoadFilter>> }
> = {
  all: {
    sourceIds: ['roads', 'road-path-classes', 'bikelanes'],
    sourceFilters: {
      roads: { roadPropertyExclude: ['service_road'] },
      'road-path-classes': {},
      bikelanes: { roadPropertyAllow: ['cycleway', 'cycleway_crossing'] },
    },
  },
  bike: {
    sourceIds: ['bikelanes', 'bikeSuitability'],
    sourceFilters: {
      bikelanes: {},
      bikeSuitability: {},
    },
  },
  foot: {
    sourceIds: ['road-path-classes', 'roads'],
    sourceFilters: {
      'road-path-classes': {},
      roads: { roadPropertyAllow: ['service_road'] },
    },
  },
  bike_foot: {
    sourceIds: ['bikelanes', 'bikeSuitability', 'road-path-classes', 'roads'],
    sourceFilters: {
      bikelanes: {},
      bikeSuitability: {},
      'road-path-classes': {},
      roads: { roadPropertyAllow: ['service_road'] },
    },
  },
  car: {
    sourceIds: ['roads'],
    sourceFilters: {
      roads: { roadPropertyExclude: ['service_road'] },
    },
  },
}

export const mapSources: MapSource[] = [
  {
    id: 'roads',
    tiles: ['https://tiles.tilda-geo.de/atlas_generalized_roads/{z}/{x}/{y}'],
    sourceLayer: 'roads',
    lineWidth: LINE_WIDTH,
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
  },
  {
    id: 'bikeSuitability',
    tiles: ['https://tiles.tilda-geo.de/atlas_generalized_bikesuitability/{z}/{x}/{y}'],
    sourceLayer: 'bikeSuitability',
    lineWidth: LINE_WIDTH_THIN,
  },
]

function buildRoadFilter(sourceId: string, mode: FortbewegungMode): FilterSpecification {
  const filters = fortbewegungConfig[mode].sourceFilters[sourceId]
  const parts: unknown[] = [
    sourceId === 'road-path-classes' ? ['>=', ['zoom'], 11] : ['>=', ['zoom'], 9],
  ]
  if (filters?.roadPropertyExclude?.length) {
    parts.push(['!', ['in', ['get', 'road'], ['literal', filters.roadPropertyExclude]]])
  }
  if (filters?.roadPropertyAllow?.length) {
    parts.push(['in', ['get', 'road'], ['literal', filters.roadPropertyAllow]])
  }
  return (parts.length === 1 ? parts[0] : ['all', ...parts]) as FilterSpecification
}

export const MapSourceLayers = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap
  const mapData = useStore($clickedMapData)
  const mapDataIds = mapData?.features?.map((feature) => feature.properties?.id) ?? []

  const mode: FortbewegungMode = params?.fortbewegung ?? 'all'
  const sourceIdsForMode = fortbewegungConfig[mode].sourceIds
  const sourcesToRender = mapSources.filter((s) => sourceIdsForMode.includes(s.id))

  return (
    <>
      {sourcesToRender.map((source) => (
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

          {/* Transparent click target: 2× main line width for easier clicking */}
          <Layer
            id={`${source.id}-click-target`}
            source={source.id}
            source-layer={source.sourceLayer}
            type="line"
            beforeId={BEFORE_CITY_LABELS}
            paint={{
              'line-color': 'transparent',
              'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                11,
                LINE_WIDTH_MIN * 2,
                14,
                source.lineWidth * 2,
              ],
              'line-opacity': 0,
            }}
            filter={buildRoadFilter(source.id, mode)}
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
            filter={buildRoadFilter(source.id, mode)}
          />
        </Source>
      ))}
    </>
  )
}
