import { cleanupMapboxLayerJson } from '../../../BaseMap/utils/cleanupMapboxLayerJson'
import type { SearchParamsCqiMap } from '../storeCqi'
import { layersCqi, legendCqi } from './layersCqi'
import { layersIncompletness, legendIncompletness } from './layersIncompletness'
import { layersLts, legendLts } from './layersLts'
// import { layersLts, legendLts } from './layersLts'

export const layersSelected = [
  cleanupMapboxLayerJson('index_casing_selected', [
    {
      layout: {
        'line-cap': 'square',
        'line-sort-key': [
          'case',
          ['match', ['get', 'proc_mandatory'], ['use_sidepath', 'optional_sidepath'], true, false],
          0,
          [
            'match',
            ['get', 'way_type'],
            ['bicycle road', 'shared bus lane', 'shared traffic lane', 'shared road'],
            true,
            false,
          ],
          2,
          1,
        ],
        visibility: 'none',
      },
      type: 'line',
      source: 'composite',
      id: 'index_casing_selected',
      paint: {
        'line-width': ['interpolate', ['linear'], ['zoom'], 0, 2.8, 10, 2.8, 22, 32],
        'line-offset': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          ['match', ['get', 'side'], ['right'], 1, ['left'], -1, 0],
          10,
          ['match', ['get', 'side'], ['right'], 1, ['left'], -1, 0],
          22,
          ['match', ['get', 'side'], ['right'], 12, ['left'], -12, 0],
        ],
        'line-color': 'rgb(41, 103, 118)',
      },
      'source-layer': 'cycling_quality_index_epsg432-4roq5v',
    },
  ]),
]

export const layerSelection: {
  key: SearchParamsCqiMap['anzeige']
  name: string
  description: null | string
}[] = [
  { key: 'cqi', name: 'Cycling Quality Index', description: 'Indexwerte 0 bis 100' },
  { key: 'lts', name: 'Level of Traffic Stress', description: 'Stress Levels 1 bis 4' },
  { key: 'incompleteness', name: 'Datenlücken', description: null },
]

export const layerByGroups: Record<SearchParamsCqiMap['anzeige'], Record<string, any>[]> = {
  cqi: layersCqi,
  lts: layersLts,
  incompleteness: layersIncompletness,
}

export type FilterConfig = {
  key: string
  values: (string | number)[]
}

export type LegendGroup = { title: string; primary?: boolean; legends: Legend[] }
type Legend = {
  key: string
  color: string
  label: string
  filterConfig: null | FilterConfig
}

export const legendByGroups: Record<SearchParamsCqiMap['anzeige'], LegendGroup[]> = {
  cqi: legendCqi,
  lts: legendLts,
  incompleteness: legendIncompletness,
}

export const interactiveLayerIdsByGroup = {
  cqi: ['index_casing'],
  lts: ['lts_casing'],
  incompleteness: ['incomp_casing'],
}
