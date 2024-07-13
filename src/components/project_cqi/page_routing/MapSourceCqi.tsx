import { Layer, Source } from 'react-map-gl/maplibre'
import { layers } from './layers'

export const MapSourceCqi = () => {
  // const mapData = useStore($clickedMapData)
  // const mapDataIds = mapData?.map((feature) => feature.properties?.id) ?? []

  // Debugging:
  // console.log(mapDataIds)
  // const map = useMap()
  // console.log(map.current?.getStyle())

  return (
    <Source
      id="cqi"
      type="vector"
      url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/cycling_quality_index.pmtiles"
      attribution="© OpenStreetMap"
    >
      {/* {layersSelected.map((layer) => {
        return (
          <Layer
            key={layer.id}
            id={layer.id}
            source="cqi"
            source-layer="default"
            type={layer.type}
            paint={layer.paint}
            layout={layer.layout}
            filter={
              wrapFilterWithAll([
                ...(layer.filter ? layer.filter : []),
                ['in', 'id', ...mapDataIds],
              ]) as FilterSpecification
            }
          />
        )
      })} */}

      {layers.map((layer) => {
        return (
          <Layer
            key={layer.id}
            id={layer.id}
            source="cqi"
            source-layer="default"
            type={layer.type as any}
            paint={layer.paint as any}
            // layout={{ visibility: visible ? 'visible' : 'none' }}
            // filter={wrapFilterWithAll(layer.filter) as FilterSpecification}
          />
        )
      })}
    </Source>
  )
}
