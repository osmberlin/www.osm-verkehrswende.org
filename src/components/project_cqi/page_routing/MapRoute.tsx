import { useStore } from '@nanostores/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Layer, Marker, type MarkerDragEvent, Source, useMap } from 'react-map-gl/maplibre'
import initSync from 'route-snapper'
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
      initSync()
      const graphPath = '/project_cqi/page_routing/route-snapper-graph.bin'
      try {
        const resp = await fetch(graphPath)
        const graphBytes = await resp.arrayBuffer()
        routeSnapper.current = new RouteTool(map.current!.getMap(), new Uint8Array(graphBytes))
        routeSnapper.current.active = true
        console.log('Route tool', routeSnapper.current)
      } catch (err) {
        console.log(`Route tool broke: ${err}`)
        snapTool.current!.innerHTML = 'Failed to load'
      }
    }

    initializeRouteSnapper()
  }, [])

  const [markerStart, setMarkerStart] = useState({ lat: 52.4783, lon: 13.4492 })
  const onMarkerStartDragEnd = (event: MarkerDragEvent) => {
    setMarkerStart({ lat: event.lngLat.lat, lon: event.lngLat.lng })
  }
  const [markerEnd, setMarkerEnd] = useState({ lat: 52.4726, lon: 13.435 })
  const onMarkerEndDragEnd = (event: MarkerDragEvent) => {
    setMarkerEnd({ lat: event.lngLat.lat, lon: event.lngLat.lng })
  }

  const circleRadiusPixels = 10

  return (
    <Fragment>
      <Marker
        longitude={markerStart.lat}
        latitude={markerStart.lon}
        anchor="bottom"
        draggable
        // onDragStart={onMarkerDragStart}
        // onDrag={onMarkerDrag}
        onDragEnd={onMarkerStartDragEnd}
      >
        <div className="rounded-md bg-red-400">Start</div>
      </Marker>
      <Marker
        longitude={markerEnd.lat}
        latitude={markerEnd.lon}
        anchor="bottom"
        draggable
        // onDragStart={onMarkerDragStart}
        // onDrag={onMarkerDrag}
        onDragEnd={onMarkerEndDragEnd}
      >
        <div className="rounded-md bg-red-400">End</div>
      </Marker>
      <Source id="route_line" type="geojson" data={routeToolGj} attribution="© OpenStreetMap">
        <div ref={snapTool} className="absolute inset-x-5 rounded bg-red-400">
          Route tool loading...
        </div>
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
    </Fragment>
  )
}
