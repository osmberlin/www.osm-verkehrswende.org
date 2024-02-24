import { $clickedMapData, $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { Layer, Source } from 'react-map-gl/maplibre'
import { layers } from './layers'
import type { SearchParamsCqiMap } from './storeCqi'

export const MapSourceCqi = () => {
  const params = useStore($searchParams) as SearchParamsCqiMap
  const mapData = useStore($clickedMapData)
  const mapDataIds = mapData?.map((feature) => feature.properties?.id) ?? []

  return (
    <Source
      id="cqi"
      type="vector"
      url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/cycling_quality_index.pmtiles"
      attribution="© OpenStreetMap"
    >
      <Layer
        // We use this layer in <OverlayStats> to calculate the total length
        // This is also our `interactiveLayer` (update manually!)
        key="clicktargetAndStatsTotal"
        id="clicktargetAndStatsTotal"
        source="cqi"
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
        source="cqi"
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

      {/* <Layer
        key="missing-roads"
        id="missing-roads"
        source="cqi"
        source-layer="default"
        type="line"
        paint={{
          'line-color': '#db2777',
          'line-width': 5, // different with by road type
          'line-opacity': 0.9,
        }}
      /> */}

      {layers.map((layer) => {
        const visible = layer.id === params?.anzeige
        const anzeigeFilter = params?.anzeige ? ['==', ['get', params?.anzeige], true] : undefined
        const filter = ['all', layer.filter, anzeigeFilter].filter(Boolean) as any
        return (
          <Layer
            key={layer.id}
            id={layer.id}
            type={layer.type as any}
            paint={layer.paint as any}
            layout={layer.layout as any}
            // layout={{ visibility: visible ? 'visible' : 'none' }}
            // filter={filter}
            filter={(layer.filter || ['all']) as any}
            source="cqi"
            source-layer="default"
          />
        )
      })}
    </Source>
  )
}
