import 'maplibre-gl/dist/maplibre-gl.css'
import { NavigationControl } from 'react-map-gl/maplibre'
import { BaseMap } from '../../BaseMap/BaseMap'
import { MapInspector } from './MapInspector'
import { MapSourceBoundaries } from './MapSourceBoundaries'
import { MapSourceMapillaryMissingImages } from './MapSourceMapillaryMissingImages'
import { Overlay } from './Overlay'

export const MapillaryMap = () => {
  return (
    <BaseMap
      initialViewState={{
        longitude: 13.390386527027175,
        latitude: 52.5180225850377,
        zoom: 12,
      }}
    >
      <MapSourceBoundaries />
      <MapSourceMapillaryMissingImages />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      <Overlay />
    </BaseMap>
  )
}
