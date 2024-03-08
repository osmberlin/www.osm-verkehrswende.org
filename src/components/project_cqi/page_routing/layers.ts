import { cleanupMapboxLayerJson } from '@components/BaseMap/utils/cleanupMapboxLayerJson'

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

export const layers = [
  {
    id: 'debugStyleLayerLine',
    type: 'line',
    paint: {
      'line-width': 3,
      'line-color': '#a21caf',
      'line-opacity': 0.6,
    },
  },
]

export const interactiveLayerIds = ['index_casing']
