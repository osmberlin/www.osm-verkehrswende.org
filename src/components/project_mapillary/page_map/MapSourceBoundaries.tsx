import { Layer, Source } from 'react-map-gl/maplibre'

export const MapSourceBoundaries = () => {
  return (
    <Source
      id="boundaries"
      type="vector"
      tiles={['https://tiles.radverkehrsatlas.de/boundaries/{z}/{x}/{y}']}
      attribution=""
    >
      <Layer
        source="atlas_boundaries"
        source-layer="boundaries"
        type="line"
        paint={{
          'line-color': 'hsl(323, 43%, 76%)',
          'line-opacity': 0.6,
          'line-dasharray': [2.5, 1, 1, 1],
          'line-width': 2,
        }}
        filter={['match', ['get', 'admin_level'], [9, 10], true, false]}
      />
    </Source>
  )
}
