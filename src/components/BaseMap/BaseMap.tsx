import { useStore } from '@nanostores/react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import * as pmtiles from 'pmtiles'
import { useEffect, useState } from 'react'
import { Map, type ViewStateChangeEvent } from 'react-map-gl/maplibre'
import {
  $clickedMapData,
  $mapLoaded,
  $searchParams,
  paramMapParse,
  paramMapStringify,
  type MapSearchParam,
  type SearchParamBaseMap,
} from './store'
import { roundPositionForURL } from './utils/roundNumber'

type Props = {
  initialViewState: MapSearchParam
  interactiveLayerIds: string[]
  boxZoom?: boolean
  children: React.ReactNode
}

export const BaseMap = ({ initialViewState, interactiveLayerIds, boxZoom, children }: Props) => {
  useEffect(() => {
    const protocol = new pmtiles.Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

  const params = useStore($searchParams) as SearchParamBaseMap

  const [cursorStyle, setCursorStyle] = useState('grab')

  const setParamsMap = ({ latitude, longitude, zoom }: MapSearchParam) => {
    const mapParamsRounded = roundPositionForURL({ latitude, longitude, zoom })
    const mapParamString = paramMapStringify(mapParamsRounded)
    const replaceHistory = true
    $searchParams.open({ ...params, map: mapParamString }, replaceHistory)
  }

  // Update ?map on zoom or pan of map
  const handleMoveEnd = (event: ViewStateChangeEvent) => {
    const { latitude, longitude, zoom } = event.viewState
    setParamsMap({ latitude, longitude, zoom })
  }

  // Set ?map to `initialViewState` if no `map` present, yet
  useEffect(() => {
    if (params.map) return
    setParamsMap(initialViewState)
  }, [])

  const latLngZoom = paramMapParse(params.map)

  return (
    <Map
      initialViewState={{
        ...initialViewState,
        zoom: latLngZoom.zoom || initialViewState.zoom,
        latitude: latLngZoom.latitude || initialViewState.latitude,
        longitude: latLngZoom.longitude || initialViewState.longitude,
      }}
      // Style: https://cloud.maptiler.com/maps/dataviz/
      mapStyle="https://api.maptiler.com/maps/dataviz/style.json?key=ur6Yh3ULc6QjatOYBgln"
      style={{ width: '100%', height: '100%' }}
      boxZoom={boxZoom || true}
      // hash
      // Set map state for <MapData>:
      onLoad={() => $mapLoaded.set(true)}
      // MapLocation
      onMoveEnd={handleMoveEnd}
      // Handle cursor and click:
      interactiveLayerIds={interactiveLayerIds}
      cursor={cursorStyle}
      onMouseEnter={() => setCursorStyle('pointer')}
      onMouseLeave={() => setCursorStyle('grab')}
      onClick={(event) => $clickedMapData.set(event.features)}
    >
      {children}
    </Map>
  )
}
