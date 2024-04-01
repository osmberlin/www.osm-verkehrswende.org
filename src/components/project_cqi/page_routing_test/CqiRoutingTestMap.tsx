import { BaseMap, type MapInitialViewState } from '@components/BaseMap/BaseMap'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Layer, NavigationControl, Source } from 'react-map-gl/maplibre'
import { MapRoute } from '../page_routing/MapRoute'
import { interactiveLayerIds } from '../page_routing/layers'
import geojsonData from '/project_cqi/page_routing_test/routing-test-network.geojson?url'

// Now you can use geojsonData in your component
type Props = {
  center: { lat: number; lng: number }
  minZoom: MapInitialViewState['minZoom']
  maxZoom?: MapInitialViewState['maxZoom']
}

export const CqiRoutingTestMap = ({ center, minZoom, maxZoom }: Props) => {
  const graphPath = '/project_cqi/page_routing_test/routing-test-network-graph.bin'

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
      <Source id="lts" type="geojson" data={geojsonData} attribution="© tordans">
        <Layer
          id="lts-forward"
          source="lts"
          type="line"
          paint={{
            'line-color': [
              'match',
              ['get', 'forward_cost'],
              [4],
              '#ab1b04',
              [3],
              '#ffcf23',
              [2],
              '#a7c878',
              [1],
              '#4589fc',
              'gray',
            ],
            'line-width': 4,
            'line-offset': 2,
          }}
        />
        <Layer
          id="lts-backward"
          source="lts"
          type="line"
          paint={{
            'line-color': [
              'match',
              ['get', 'backward_cost'],
              [4],
              '#ab1b04',
              [3],
              '#ffcf23',
              [2],
              '#a7c878',
              [1],
              '#4589fc',
              'gray',
            ],
            'line-width': 4,
            'line-offset': -2,
          }}
        />
      </Source>
      <NavigationControl showCompass={false} position="top-right" />
      {/* <MapInspector /> */}
    </BaseMap>
  )
}
