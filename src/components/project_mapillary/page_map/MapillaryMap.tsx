import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { BaseMap, type MapInitialViewState } from '../../BaseMap/BaseMap'
import { FreshMapillaryLayers } from './FreshMapillaryLayers'
import { MapInspector } from './MapInspector'
import { MapSourceBoundaries } from './MapSourceBoundaries'
import { MapSourceLayers, mapSources } from './MapSourceLayers'
import { Overlay } from './Overlay'

type Props = {
  maxBounds: MapInitialViewState['maxBounds']
  minZoom: MapInitialViewState['minZoom']
  maxZoom?: MapInitialViewState['maxZoom']
  initialViewState?: MapInitialViewState
}

export const MapillaryMap = ({ maxBounds, minZoom, maxZoom, initialViewState }: Props) => {
  return (
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
      interactiveLayerIds={mapSources.map((source) => `${source.id}-coverage`)}
    >
      <MapSourceBoundaries />
      <MapSourceLayers />
      <FreshMapillaryLayers />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      <Overlay />
    </BaseMap>
  )
}
