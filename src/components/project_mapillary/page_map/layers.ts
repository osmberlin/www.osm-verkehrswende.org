export const layers = [
  {
    id: 'current',
    type: 'line',
    paint: {
      'line-color': '#1e40af',
      'line-width': 2.2,
    },
    filter: ['in', ['get', 'mapillary_coverage'], ['literal', ['regular', 'pano']]],
  },
  {
    id: 'pano',
    type: 'line',
    paint: {
      'line-color': '#3730a3',
      'line-width': 2.2,
    },
    filter: ['==', ['get', 'mapillary_coverage'], 'pano'],
  },
]
