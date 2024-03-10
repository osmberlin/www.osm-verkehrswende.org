import { useStore } from '@nanostores/react'
import { Layer, Source, useMap } from 'react-map-gl/maplibre'
import { $routeToolGj } from './storeRouting'

export const MapRoute = () => {
  const routeToolGj = useStore($routeToolGj)

  const map = useMap()
  console.log(map.current?.getMap())

  // const graphPath = '/project_cqi/page_routing/route-snapper-graph.bin'
  const circleRadiusPixels = 10

  return (
    <Source id="route_line" type="geojson" data={routeToolGj} attribution="© OpenStreetMap">
      <Layer
        key="route_line"
        id="route_line"
        source="route_line"
        type="line"
        paint={{
          'line-color': '#ff0000',
          'line-width': 2,
        }}
      />
      <Layer
        id="route-points"
        type="circle"
        filter={['==', '$type', 'Point']}
        paint={{
          'circle-color': [
            'match',
            ['get', 'type'],
            'snapped-waypoint',
            'red',
            'free-waypoint',
            'blue',
            'black',
          ],
          'circle-opacity': ['case', ['has', 'hovered'], 0.5, 1.0],
          'circle-radius': [
            'match',
            ['get', 'type'],
            'node',
            circleRadiusPixels / 2.0,
            circleRadiusPixels,
          ],
        }}
      />
      <Layer
        id="route-lines"
        type="line"
        filter={['==', '$type', 'LineString']}
        paint={{
          'line-color': ['case', ['get', 'snapped'], 'red', 'blue'],
          'line-width': 2.5,
        }}
      />
      <Layer
        id="route-polygons"
        type="fill"
        filter={['==', '$type', 'Polygon']}
        paint={{
          'fill-color': 'black',
          'fill-opacity': 0.5,
        }}
      />
    </Source>
  )
}
