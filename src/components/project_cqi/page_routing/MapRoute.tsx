import { useStore } from '@nanostores/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Layer, Marker, Source, type MarkerDragEvent } from 'react-map-gl/maplibre'
import initSync, { JsRouteSnapper } from 'route-snapper'
import { $routeToolGj } from './storeRouting'
import { IconMarkerCursor } from './icons/IconMarkerCursor'
import { IconMove } from './icons/IconMove'

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
    // const routeString = routeSnapper.current.renderGeojson() // shows more points
    const routeString = routeSnapper.current.toFinalFeature()
    if (!routeString) {
      console.error('updateRoute: `toFinalFeature` is `undefined`')
      return
    }
    const routeGeojson = JSON.parse(routeString)
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
        <div className="ml-2 flex items-center justify-center gap-0.5 rounded-md bg-fuchsia-700 px-1 py-0.5 text-fuchsia-50 hover:bg-fuchsia-800">
          <IconMarkerCursor />
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
        <div className="ml-2 flex items-center justify-center gap-0.5 rounded-md bg-fuchsia-700 px-1 py-0.5 text-fuchsia-50 hover:bg-fuchsia-800">
          <IconMarkerCursor />
          Ziel
        </div>
      </Marker>
      <div className="absolute left-3 top-3 rounded bg-white/90 px-2 py-0.5">
        <button
          onClick={changeDirection}
          className="group flex items-center gap-1 underline underline-offset-2 hover:decoration-fuchsia-700 hover:decoration-2"
        >
          Start
          <IconMove />
          Ziel
        </button>
      </div>

      <Source id="route_line" type="geojson" data={routeToolGj} attribution="© OpenStreetMap">
        <Layer
          id="route-lines"
          type="line"
          paint={{
            'line-color': '#18181b', // 'zinc-900'
            'line-opacity': 0.95,
            'line-width': 16,
          }}
          layout={{ 'line-cap': 'round', 'line-join': 'round' }}
        />
      </Source>
    </Fragment>
  )
}
