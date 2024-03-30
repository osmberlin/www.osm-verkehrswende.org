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
    id: 'border',
    type: 'line',
    paint: {
      'line-color': 'white',
      'line-width': 3.2,
      'line-opacity': 1,
    },
  },
  {
    id: 'routing_index_main_colour',
    type: 'line',
    paint: {
      'line-color': [
        'step',
        ['get', 'index'],
        '#7a0403',
        10,
        '#ab1b04',
        20,
        '#d54a12',
        30,
        '#f5a038',
        40,
        '#f3cf33',
        50,
        '#e6f122',
        60,
        '#a7c878',
        70,
        '#679fce',
        80,
        '#4473e1',
        90,
        '#436dda',
        100,
        '#4143a7',
      ],
      'line-width': 2,
    },
  },
]

// export const interactiveLayerIds = ['routing_index_main_colour']
export const interactiveLayerIds = []
