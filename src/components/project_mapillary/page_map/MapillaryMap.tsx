import { $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { BaseMap, type MapInitialViewState } from '../../BaseMap/BaseMap'
import { MapillaryQueryClient } from './MapillaryQueryClient'
import { MapInspector } from './MapInspector'
import { MapSourceBoundaries } from './MapSourceBoundaries'
import { MapSourceLayers, fortbewegungConfig } from './MapSourceLayers'
import { MAPILLARY_INTERACTIVE_LAYERS, MapSourceMapillary } from './MapSourceMapillary'
import { Overlay } from './Overlay'
import type { SearchParamsMapillaryMap } from './storeMapillary'

type Props = {
  maxBounds: MapInitialViewState['maxBounds']
  minZoom: MapInitialViewState['minZoom']
  maxZoom?: MapInitialViewState['maxZoom']
  initialViewState?: MapInitialViewState
}

export const MapillaryMap = ({ maxBounds, minZoom, maxZoom, initialViewState }: Props) => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap
  const mode = params?.fortbewegung ?? 'all'
  const clickTargetLayerIds = fortbewegungConfig[mode].sourceIds.map((id) => `${id}-click-target`)

  return (
    <MapillaryQueryClient>
      <BaseMap
        initialViewState={{
          // Use provided initialViewState or fallback to Germany center
          longitude: initialViewState?.longitude ?? 10.5,
          latitude: initialViewState?.latitude ?? 51.2,
          zoom: initialViewState?.zoom ?? 6,
          // Only pass the props if they are implicitly present
          // Needed to get rid of Astro's strict TS settings https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes
          ...(maxBounds ? { maxBounds } : {}),
          ...(minZoom ? { minZoom } : {}),
          ...(maxZoom ? { maxZoom } : {}),
        }}
        interactiveLayerIds={[...clickTargetLayerIds, ...MAPILLARY_INTERACTIVE_LAYERS]}
      >
        <MapSourceBoundaries />
        <MapSourceLayers />
        <MapSourceMapillary />
        <NavigationControl showCompass={false} position="top-right" />
        <MapInspector />
        <Overlay />
      </BaseMap>
    </MapillaryQueryClient>
  )
}
