import { wrapFilterWithAll } from './wrapFilterWithAll'

export const debugLayerStyles = ({
  filter,
}: {
  filter?: ['match', ['get', string], string[], boolean, boolean]
}) => {
  return [
    {
      id: 'debugStyleLayerLine',
      type: 'line',
      paint: {
        'line-width': 10,
        'line-color': '#a21caf',
        'line-opacity': 0.6,
      },
      filter: wrapFilterWithAll(filter),
    },
    {
      id: 'debugStyleLayerCircle',
      type: 'circle',
      paint: {
        'circle-radius': 5,
        'circle-opacity': 0.6,
        'circle-color': '#701a75',
      },
      filter: wrapFilterWithAll(filter),
    },
    {
      id: 'debugStyleLayerFill',
      type: 'fill',
      paint: {
        'fill-color': '#a21caf',
        'fill-outline-color': '#701a75',
        'fill-opacity': 0.3,
      },
      filter: wrapFilterWithAll(filter),
    },
  ]
}
