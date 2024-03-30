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

  const changeDirection = () => {
    updateRoutePoints({ start: markerEnd, end: markerStart })
  }

  return (
    <Fragment>
      <Marker
        longitude={markerStart.lng}
        latitude={markerStart.lat}
        anchor="left"
        draggable
        // onDragStart={onMarkerDragStart}
        // onDrag={onMarkerDrag}
        onDragEnd={onMarkerStartDragEnd}
      >
        <div className="ml-2 flex items-center justify-center gap-0.5 rounded-md bg-red-500 px-1 py-0.5 text-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
            />
          </svg>
          Start
        </div>
      </Marker>
      <Marker
        longitude={markerEnd.lng}
        latitude={markerEnd.lat}
        anchor="left"
        draggable
        // onDragStart={onMarkerDragStart}
        // onDrag={onMarkerDrag}
        onDragEnd={onMarkerEndDragEnd}
      >
        <div className="ml-2 flex items-center justify-center gap-0.5 rounded-md bg-red-500 px-1 py-0.5 text-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
            />
          </svg>
          End
        </div>
      </Marker>
      <div className="absolute left-3 top-3 rounded bg-white/90 px-2 py-0.5">
        <button
          onClick={changeDirection}
          className="flex items-center gap-1 underline hover:decoration-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
            />
          </svg>
          Reverse Route Direction
        </button>
      </div>
      <Source id="route_line" type="geojson" data={routeToolGj} attribution="© OpenStreetMap">
        <Layer
          id="route-lines"
          type="line"
          filter={['==', '$type', 'LineString']}
          paint={{
            // 'line-color': ['case', ['get', 'snapped'], 'red', 'blue'],
            'line-color': '#18181b', // 'zinc-900'
            'line-opacity': 0.95,
            'line-width': 16,
          }}
          layout={{ 'line-cap': 'round', 'line-join': 'round' }}
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
              '#18181b', // 'zinc-900'
              // 'free-waypoint',
              // 'blue',
              'node',
              '#09090b', // 'zinc-950'
              'transparent',
            ],
            // 'circle-opacity': ['case', ['has', 'hovered'], 0.5, 1.0],
            // 'circle-radius': ['match', ['get', 'type'], 'node', 8, 'snapped-waypoint', 10, 0],
            'circle-radius': ['match', ['get', 'type'], 'snapped-waypoint', 10, 0],
          }}
        />
      </Source>
    </Fragment>
  )
}
