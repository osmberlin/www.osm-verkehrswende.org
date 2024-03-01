export const layers = [
  {
    id: 'complete',
    type: 'line',
    paint: {
      'line-color': '#1e40af',
      'line-width': 2.2,
    },
    filter: ['==', ['get', 'complete'], true],
  },
  {
    id: 'completePano',
    type: 'line',
    paint: {
      'line-color': '#3730a3',
      'line-width': 2.2,
    },
    filter: ['==', ['get', 'completePano'], true],
  },
  {
    id: 'completeFresh',
    type: 'line',
    paint: {
      'line-color': '#1e40af',
      'line-width': 2.2,
    },
    filter: ['==', ['get', 'completeFresh'], true],
  },
  {
    id: 'completeFreshPano',
    type: 'line',
    paint: {
      'line-color': '#3730a3',
      'line-width': 2.2,
    },
    filter: ['==', ['get', 'completeFreshPano'], true],
  },
]
