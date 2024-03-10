import { BaseMap } from '@components/BaseMap/BaseMap'
import { type MapSearchParam } from '@components/BaseMap/store'
import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { MapRoute } from './MapRoute'
import { MapSourceCqi } from './MapSourceCqi'
import { interactiveLayerIds } from './layers'

type Props = {
  maxBounds: MapSearchParam['maxBounds']
  minZoom: MapSearchParam['minZoom']
  maxZoom?: MapSearchParam['maxZoom']
}

export const CqiRoutingMap = ({ maxBounds, minZoom, maxZoom }: Props) => {
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
      boxZoom={false}
      interactiveLayerIds={interactiveLayerIds}
    >
      <MapRoute />
      <MapSourceCqi />
      <NavigationControl showCompass={false} position="top-right" />
      {/* <MapInspector /> */}
      {/* <Overlay /> */}
    </BaseMap>
  )
}
