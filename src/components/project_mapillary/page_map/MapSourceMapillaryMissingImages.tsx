import { $clickedMapData, $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { Layer, Source } from 'react-map-gl/maplibre'
import { layers } from './layers'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export const MapSourceMapillaryMissingImages = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap
  const mapData = useStore($clickedMapData)
  const mapDataIds = mapData?.map((feature) => feature.properties?.id) ?? []

  return (
    <Source
      id="mapillary-missing-images"
      type="vector"
      url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/roadsMatched.pmtiles"
      attribution="© Mapillary, © OpenStreetMap"
    >
      <Layer
        // We use this layer in <OverlayStats> to calculate the total length
        // This is also our `interactiveLayer` (update manually!)
        key="clicktargetAndStatsTotal"
        id="clicktargetAndStatsTotal"
        source="mapillary-missing-images"
        source-layer="default"
        type="line"
        paint={{
          'line-color': '#ff0296',
          'line-width': 5,
          'line-opacity': 0,
        }}
        filter={['all']}
      />

      <Layer
        key="selected"
        id="selected"
        source="mapillary-missing-images"
        source-layer="default"
        type="line"
        paint={{
          'line-color': '#125767',
          'line-width': 15,
          'line-blur': 0,
          'line-opacity': 0.9,
        }}
        filter={['in', 'id', ...mapDataIds]}
      />

      <Layer
        key="missing-roads"
        id="missing-roads"
        source="mapillary-missing-images"
        source-layer="default"
        type="line"
        paint={{
          'line-color': '#db2777',
          'line-width': 5, // different with by road type
          'line-opacity': 0.9,
        }}
        filter={['all', ['==', ['get', params?.anzeige], false]]}
      />

      {layers.map((layer) => {
        const visible = layer.id === params?.anzeige
        const anzeigeFilter = params?.anzeige ? ['==', ['get', params?.anzeige], true] : undefined
        const filter = ['all', layer.filter, anzeigeFilter].filter(Boolean) as any
        return (
          <Layer
            key={layer.id}
            id={layer.id}
            type="line"
            paint={{
              ...layer.paint,
              'line-opacity': visible ? 1 : 0,
            }}
            filter={filter}
            source="mapillary-missing-images"
            source-layer="default"
            // We cannot use layout.visibilty because our FilterStat need to calculate all stats at once, which it can't when the layer is hidden. We hide it by opacity instead.
            // layout={{ visibility: visible ? 'visible' : 'none' }}
          />
        )
      })}
    </Source>
  )
}
