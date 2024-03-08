import { cleanupMapboxLayerJson } from '../../../BaseMap/utils/cleanupMapboxLayerJson'

export const layersLts = [
  cleanupMapboxLayerJson('lts_casing', [
    {
      layout: {
        'line-cap': 'round',
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
      },
      type: 'line',
      source: 'composite',
      id: 'lts_casing',
      paint: {
        'line-width': ['interpolate', ['linear'], ['zoom'], 0, 1.4, 10, 1.4, 22, 16],
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
        'line-color': [
          'match',
          ['get', 'way_type'],
          [
            'shared path',
            'crossing',
            'shared footway',
            'cycle lane (protected)',
            'cycle track',
            'segregated path',
            'link',
            'cycle path',
            'track or service',
          ],
          'rgb(125, 125, 125)',
          'rgb(0, 0, 0)',
        ],
      },
      'source-layer': 'cycling_quality_index_epsg432-9mobr8',
    },
  ]),
  cleanupMapboxLayerJson('lts_gap_background', [
    {
      layout: {
        'line-cap': 'round',
      },
      type: 'line',
      source: 'composite',
      id: 'lts_gap_background',
      paint: {
        'line-color': [
          'match',
          ['get', 'index2stresslevel'],
          [1],
          '#ab1b04',
          [2],
          '#f5a038',
          [3],
          '#f3cf33',
          [4],
          '#a7c878',
          'transparent',
        ],
        'line-width': ['interpolate', ['linear'], ['zoom'], 0, 1, 10, 1, 22, 12],
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
      },
      'source-layer': 'cycling_quality_index_epsg432-9mobr8',
    },
  ]),
  cleanupMapboxLayerJson('lts_main_colour', [
    {
      layout: {
        'line-sort-key': [
          'step',
          ['get', 'index2stresslevel'],
          3,
          10,
          10,
          20,
          20,
          30,
          30,
          40,
          40,
          50,
          50,
          60,
          60,
          70,
          70,
          80,
          80,
          90,
          90,
        ],
      },
      type: 'line',
      source: 'composite',
      id: 'lts_main_colour',
      paint: {
        'line-color': [
          'match',
          ['get', 'index2stresslevel'],
          [1],
          '#ab1b04',
          [2],
          '#f5a038',
          [3],
          '#f3cf33',
          [4],
          '#a7c878',
          'transparent',
        ],
        'line-width': ['interpolate', ['linear'], ['zoom'], 0, 1, 10, 1, 22, 12],
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
      },
      'source-layer': 'cycling_quality_index_epsg432-9mobr8',
    },
  ]),
]

export const legendLts = [
  {
    color: '#ab1b04',
    label: 'LTS 1 (Kampfradler)',
    filterConfig: { key: 'index2stresslevel', rule: '==', value: 1 },
  },
  {
    color: '#f5a038',
    label: 'LTS 2',
    filterConfig: { key: 'index2stresslevel', rule: '==', value: 2 },
  },
  {
    color: '#f3cf33',
    label: 'LTS 3',
    filterConfig: { key: 'index2stresslevel', rule: '==', value: 3 },
  },
  {
    color: '#a7c878',
    label: 'LTS 4 (Kindertauglich)',
    filterConfig: { key: 'index2stresslevel', rule: '==', value: 4 },
  },
]