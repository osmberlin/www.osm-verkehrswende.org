import { bezierSpline, featureCollection } from '@turf/turf'
import type { StoreValue } from 'nanostores'
import { Layer, Source } from 'react-map-gl/maplibre'
import type { $routeToolGj, CqiRoutingSearchparamsObject } from './storeRouting'

type Props = {
  route: StoreValue<typeof $routeToolGj>
  startMarker: CqiRoutingSearchparamsObject['start']
  endMarker: CqiRoutingSearchparamsObject['end']
}

export const SourceLayerLastmile = ({ route, startMarker, endMarker }: Props) => {
  // Via https://github.com/Turfjs/turf/issues/1218#issuecomment-2039467520
  const buildArcLine = (
    [startLng, startLat]: [number, number],
    [endLng, endLat]: [number, number],
  ) => {
    const midLng = (startLng + endLng) / 2
    const midLat = (startLat + endLat) / 2
    const distLng = Math.abs(startLng - endLng)
    const distLat = Math.abs(startLat - endLat)
    const curveLat = distLat < distLng ? endLat : midLat
    const curveLng = distLng < distLat ? endLng : midLng

    return bezierSpline(
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [startLng, startLat],
            [curveLng, curveLat],
            [endLng, endLat],
          ],
        },
      },
      { resolution: 2500 },
    )
  }

  // Draw lastmile line
  const routeStart = route.geometry.coordinates.at(0) as [number, number]
  const routeEnd = route.geometry.coordinates.at(-1) as [number, number]
  const lastmileLine =
    routeStart && routeEnd
      ? featureCollection([
          buildArcLine([routeStart[0], routeStart[1]], [startMarker.lng, startMarker.lat]),
          buildArcLine([routeEnd[0], routeEnd[1]], [endMarker.lng, endMarker.lat]),
        ])
      : featureCollection([])

  return (
    <Source id="lastmile" type="geojson" data={lastmileLine}>
      <Layer
        id="lastmile-lines"
        type="line"
        paint={{
          'line-color': '#a21caf', // 'fucia-700'
          'line-opacity': 0.95,
          'line-width': 2,
          'line-dasharray': [0.5, 1.5],
        }}
        layout={{ 'line-cap': 'round', 'line-join': 'round' }}
      />
    </Source>
  )
}
