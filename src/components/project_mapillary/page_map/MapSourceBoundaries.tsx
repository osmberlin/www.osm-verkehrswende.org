import { Layer, Source } from 'react-map-gl/maplibre'
import { BEFORE_CITY_LABELS } from './constants'

export const MapSourceBoundaries = () => {
  return (
    <Source
      id="boundaries"
      key="boundaries"
      type="vector"
      tiles={['https://tiles.tilda-geo.de/boundaries/{z}/{x}/{y}']}
      attribution="© OpenStreetMap, <a href='https://tilda-geo.de/regionen/radinfra'>tilda-geo.de</a>"
    >
      <Layer
        id="boundaries"
        key="boundaries"
        source="boundaries"
        source-layer="boundaries"
        type="line"
        beforeId={BEFORE_CITY_LABELS}
        paint={{
          'line-color': 'hsl(323, 43%, 76%)',
          'line-opacity': 0.6,
          'line-dasharray': [2.5, 1, 1, 1],
          'line-width': 2,
        }}
        filter={[
          'any',
          ['all', ['<', ['zoom'], 11], ['==', ['get', 'admin_level'], 4]],
          ['all', ['>=', ['zoom'], 11], ['match', ['get', 'admin_level'], [9, 10], true, false]],
        ]}
      />
    </Source>
  )
}
