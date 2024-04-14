import { BaseMap, type MapInitialViewState } from '@components/BaseMap/BaseMap'
import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { MapRoute } from './MapRoute'
import { MapSourceCqi } from './MapSourceCqi'
import { interactiveLayerIds } from './layers'

type Props = {
  center: { lat: number; lng: number }
  minZoom: MapInitialViewState['minZoom']
  maxZoom?: MapInitialViewState['maxZoom']
}

export const CqiRoutingMap = ({ center, minZoom, maxZoom }: Props) => {
  const graphPath = '/project_cqi/routing/routing_cycling_quality_index_lts1.bin.br'

  return (
    <BaseMap
      initialViewState={{
        longitude: center.lng,
        latitude: center.lat,
        zoom: 14.7,
        // Only pass the props if they are implicitly present
        // Needed to get rid of Astro's strict TS settings https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes
        ...(minZoom ? { minZoom } : {}),
        ...(maxZoom ? { maxZoom } : {}),
      }}
      boxZoom={false}
      interactiveLayerIds={interactiveLayerIds}
    >
      <MapRoute graphPath={graphPath} />
      <MapSourceCqi />
      <NavigationControl showCompass={false} position="top-right" />
      {/* <MapInspector /> */}
      {/* <Overlay /> */}
    </BaseMap>
  )
}
