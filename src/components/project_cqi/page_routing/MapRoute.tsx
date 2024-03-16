import { useStore } from '@nanostores/react'
import { useEffect, useRef } from 'react'
import { Layer, Source, useMap } from 'react-map-gl/maplibre'
import initRouteSnapper from 'route-snapper'
import { $routeToolGj } from './storeRouting'
import { RouteTool } from './utils/routeSnapperTools'

export const MapRoute = () => {
  const routeToolGj = useStore($routeToolGj)

  const map = useMap()
  console.log(map.current?.getMap())

  const routeSnapper = useRef<RouteTool | null>(null)
  const snapTool = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const initializeRouteSnapper = async () => {
      await initRouteSnapper()
      const graphPath = '/project_cqi/page_routing/route-snapper-graph.bin'
      try {
        const resp = await fetch(graphPath)
        const graphBytes = await resp.arrayBuffer()
        routeSnapper.current = new RouteTool(map.current!.getMap(), new Uint8Array(graphBytes))
      } catch (err) {
        console.log(`Route tool broke: ${err}`)
        snapTool.current!.innerHTML = 'Failed to load'
      }
    }

    initializeRouteSnapper()
  }, [])

  const circleRadiusPixels = 10

  return (
    <Source id="route_line" type="geojson" data={routeToolGj} attribution="© OpenStreetMap">
      <div ref={snapTool}>Route tool loading...</div>
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
