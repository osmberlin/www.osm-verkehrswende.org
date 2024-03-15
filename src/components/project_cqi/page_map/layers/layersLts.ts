import { cleanupMapboxLayerJson } from '../../../BaseMap/utils/cleanupMapboxLayerJson'
import type { LegendGroup } from './layers'

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
        visibility: 'none',
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
      'source-layer': 'cycling_quality_index_epsg432-4roq5v',
    },
  ]),
  cleanupMapboxLayerJson('lts_gap_background', [
    {
      layout: {
        'line-cap': 'round',
        'line-sort-key': ['step', ['get', 'stress_level'], 4, 2, 3, 3, 2, 4, 1],
        visibility: 'none',
      },
      type: 'line',
      source: 'composite',
      id: 'lts_gap_background',
      paint: {
        'line-color': [
          'match',
          ['get', 'stress_level'],
          [4],
          '#ab1b04',
          [3],
          '#ffcf23',
          [2],
          '#a7c878',
          [1],
          '#4589fc',
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
      'source-layer': 'cycling_quality_index_epsg432-4roq5v',
    },
  ]),
  cleanupMapboxLayerJson('lts_main_colour', [
    {
      type: 'line',
      source: 'composite',
      id: 'lts_main_colour',
      paint: {
        'line-color': [
          'match',
          ['get', 'stress_level'],
          [4],
          '#ab1b04',
          [3],
          '#ffcf23',
          [2],
          '#a7c878',
          [1],
          '#4589fc',
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
      'source-layer': 'cycling_quality_index_epsg432-4roq5v',
      layout: {
        'line-sort-key': ['step', ['get', 'stress_level'], 4, 2, 3, 3, 2, 4, 1],
        visibility: 'none',
      },
    },
  ]),
]

export const legendLts: LegendGroup[] = [
  {
    title: 'Hauptkategorie',
    primary: true,
    legends: [
      {
        key: 'stress_level_1',
        color: '#4589fc',
        label: 'LTS 1 (Kindertauglich)',
        filterConfig: { key: 'stress_level', values: [1] },
      },
      {
        key: 'stress_level_2',
        color: '#a7c878',
        label: 'LTS 2 (Niedriger Stress)',
        filterConfig: { key: 'stress_level', values: [2] },
      },
      {
        key: 'stress_level_3',
        color: '#ffcf23',
        label: 'LTS 3 (Mittlerer Stress)',
        filterConfig: { key: 'stress_level', values: [3] },
      },
      {
        key: 'stress_level_4',
        color: '#ab1b04',
        label: 'LTS 4 (Kampfradler, hoher Stress)',
        filterConfig: { key: 'stress_level', values: [4] },
      },
    ],
  },
]
