import { useStore } from '@nanostores/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Layer, Marker, Source, type MarkerDragEvent } from 'react-map-gl/maplibre'
import initSync, { JsRouteSnapper } from 'route-snapper'
import { $routeToolGj } from './storeRouting'

export const MapRoute = () => {
  const routeToolGj = useStore($routeToolGj)
  const routeSnapper = useRef<JsRouteSnapper | null>(null)
  const [routeSnapperInitialized, setRouteSnapperInitialized] = useState(false)

  // Initialize route snapper by loading the graph.bin file
  useEffect(() => {
    const initializeRouteSnapper = async () => {
      initSync()

      const graphPath = '/project_cqi/page_routing/route-snapper-graph.bin'
      try {
        const resp = await fetch(graphPath)
        const graphBytes = await resp.arrayBuffer()
        console.time('JsRouteSnapper: Deserialize and setup JsRouteSnapper')
        routeSnapper.current = new JsRouteSnapper(new Uint8Array(graphBytes))
        console.timeEnd('JsRouteSnapper: Deserialize and setup JsRouteSnapper')
        setRouteSnapperInitialized(true)

        // console.log('routeSnapper.current', routeSnapper.current)
      } catch (err) {
        console.error(`Route tool broke: ${err}`)
      }
    }

    initializeRouteSnapper()
  }, [])

  // Set initial route "start", "end" points
  useEffect(() => {
    if (routeSnapperInitialized !== true && !routeSnapper.current) return
    // routeSnapper.current?.addSnappedWaypoint(markerStart.lng, markerStart.lat)
    // routeSnapper.current?.addSnappedWaypoint(markerEnd.lng, markerEnd.lat)
    updateRoutePoints({ start: markerStart, end: markerEnd })
  }, [routeSnapperInitialized, routeSnapper.current])

  const [markerStart, setMarkerStart] = useState({ lng: 13.447936, lat: 52.477325 })
  // Set new "start", use existing "end"
  const onMarkerStartDragEnd = (event: MarkerDragEvent) => {
    updateRoutePoints({ start: { lng: event.lngLat.lng, lat: event.lngLat.lat }, end: markerEnd })
  }
  const [markerEnd, setMarkerEnd] = useState({ lng: 13.434527, lat: 52.472595 })
  // Set new "end", use existing "start"
  const onMarkerEndDragEnd = (event: MarkerDragEvent) => {
    updateRoutePoints({ start: markerStart, end: { lng: event.lngLat.lng, lat: event.lngLat.lat } })
  }

  type LngLat = { lng: number; lat: number }
  type UpdateRoutePointsProps = { start: LngLat; end: LngLat }
  const updateRoutePoints = ({ start, end }: UpdateRoutePointsProps) => {
    if (!routeSnapper.current) return

    // Update route start-end points
    const waypoints = [
      { lon: start.lng, lat: start.lat, snapped: true },
      { lon: end.lng, lat: end.lat, snapped: true },
    ]
    routeSnapper.current.editExisting(waypoints)
    updateRoute()

    // Update marker on map
    setMarkerStart({ lng: start.lng, lat: start.lat })
    setMarkerEnd({ lng: end.lng, lat: end.lat })
  }

  const updateRoute = () => {
    if (!routeSnapper.current) return

    // Draw route
    const routeGeojson = JSON.parse(routeSnapper.current.renderGeojson())
    // routeSnapper.current.toFinalFeature() // TODO: What does this do?
    $routeToolGj.set(routeGeojson)

    // console.log('updateRoute: routeSnapper.current', routeSnapper.current)
    console.log('updateRoute: routeToolGj', routeToolGj)
  }

  return (
    <Fragment>
      <Marker
        longitude={markerStart.lng}
        latitude={markerStart.lat}
        anchor="bottom"
        draggable
        // onDragStart={onMarkerDragStart}
        // onDrag={onMarkerDrag}
        onDragEnd={onMarkerStartDragEnd}
      >
        <div className="rounded-md bg-red-400">Start</div>
      </Marker>
      <Marker
        longitude={markerEnd.lng}
        latitude={markerEnd.lat}
        anchor="bottom"
        draggable
        // onDragStart={onMarkerDragStart}
        // onDrag={onMarkerDrag}
        onDragEnd={onMarkerEndDragEnd}
      >
        <div className="rounded-md bg-red-400">End</div>
      </Marker>
      <Source id="route_line" type="geojson" data={routeToolGj} attribution="© OpenStreetMap">
        <Layer
          id="route-lines"
          type="line"
          filter={['==', '$type', 'LineString']}
          paint={{
            // 'line-color': ['case', ['get', 'snapped'], 'red', 'blue'],
            'line-color': 'red',
            'line-width': 2.5,
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
              'black',
              // 'free-waypoint',
              // 'blue',
              'node',
              'red',
              'transparent',
            ],
            // 'circle-opacity': ['case', ['has', 'hovered'], 0.5, 1.0],
            'circle-radius': ['match', ['get', 'type'], 'node', 3, 'snapped-waypoint', 6, 0],
          }}
        />
      </Source>
    </Fragment>
  )
}
