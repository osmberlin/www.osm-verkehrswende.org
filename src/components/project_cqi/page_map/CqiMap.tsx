import { BaseMap } from '@components/BaseMap/BaseMap'
import { $searchParams, type MapSearchParam } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { MapInspector } from './MapInspector'
import { MapSourceCqi } from './MapSourceCqi'
import type { SearchParamsCqiMap } from './storeCqi'
import { interactiveLayerIdsByGroup } from './layers/layers'
import { Overlay } from './Overlay'

type Props = {
  maxBounds: MapSearchParam['maxBounds']
  minZoom: MapSearchParam['minZoom']
  maxZoom?: MapSearchParam['maxZoom']
}

export const CqiMap = ({ maxBounds, minZoom, maxZoom }: Props) => {
  const params = useStore($searchParams) as SearchParamsCqiMap

  return (
    <BaseMap
      initialViewState={{
        longitude: 13.390386527027175,
        latitude: 52.5180225850377,
        zoom: 12,
        // Only pass the props if they are implicitly present
        // Needed to get rid of Astro's strict TS settings https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes
        ...(maxBounds ? { maxBounds } : {}),
        ...(minZoom ? { minZoom } : {}),
        ...(maxZoom ? { maxZoom } : {}),
      }}
      interactiveLayerIds={interactiveLayerIdsByGroup[params?.anzeige] || []}
    >
      <MapSourceCqi />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      <Overlay />
    </BaseMap>
  )
}
