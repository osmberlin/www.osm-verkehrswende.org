import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { BaseMap, type MapInitialViewState } from '../../BaseMap/BaseMap'
import { MapInspector } from './MapInspector'
import { MapSourceBoundaries } from './MapSourceBoundaries'
import { MapSourceMapillaryMissingImages } from './MapSourceMapillaryMissingImages'
import { Overlay } from './Overlay'

type Props = {
  maxBounds: MapInitialViewState['maxBounds']
  minZoom: MapInitialViewState['minZoom']
  maxZoom?: MapInitialViewState['maxZoom']
}

export const MapillaryMap = ({ maxBounds, minZoom, maxZoom }: Props) => {
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
      interactiveLayerIds={['clicktargetAndStatsTotal']}
    >
      <MapSourceBoundaries />
      <MapSourceMapillaryMissingImages />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      <Overlay />
    </BaseMap>
  )
}
