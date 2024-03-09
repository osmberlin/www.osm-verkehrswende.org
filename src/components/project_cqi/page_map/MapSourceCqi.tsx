import { $clickedMapData, $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import type { FilterSpecification } from 'maplibre-gl'
import { Layer, Source } from 'react-map-gl/maplibre'
import { wrapFilterWithAll } from '../../BaseMap/utils/wrapFilterWithAll'
import { layerByGroups, layersSelected } from './layers/layers'
import { $focus, type SearchParamsCqiMap } from './storeCqi'

export const MapSourceCqi = () => {
  const params = useStore($searchParams) as SearchParamsCqiMap
  const focus = useStore($focus)
  const mapData = useStore($clickedMapData)
  const mapDataIds = mapData?.map((feature) => feature.properties?.id) ?? []

  // Debugging:
  // console.log(mapDataIds)
  // const map = useMap()
  // console.log(map.current?.getStyle())

  const focusFilter = focus ? ['match', focus.key, focus.values, true, false] : null

  // See https://github.com/maplibre/maplibre-style-spec/issues/555
  const cleanFilter = (input: undefined | []) => {
    const inputString = JSON.stringify(input)
    // Regular experession that finds all occurences of `anything["get","ANYSTRING"]anything` in the string and changes them to just "anything"ANYSTRING"anything"
    const outputString = inputString.replace(/(.*?)\["get","([^"]*)"\](.*?)/g, '$1"$2"$3')
    return JSON.parse(outputString)
  }

  return (
    <Source
      id="cqi"
      type="vector"
      url="pmtiles://https://atlas-tiles.s3.eu-central-1.amazonaws.com/cycling_quality_index.pmtiles"
      attribution="© OpenStreetMap"
    >
      {layersSelected.map((layer) => {
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
                focusFilter,
                ...(layer.filter ? cleanFilter(layer.filter) : []),
                ['in', 'id', ...mapDataIds],
              ]) as FilterSpecification
            }
          />
        )
      })}

      {Object.entries(layerByGroups).map(([groupkey, groupLayers]) => {
        return groupLayers.map((layer) => {
          const visible = params?.anzeige === groupkey

          return (
            <Layer
              key={layer.id}
              id={layer.id}
              source="cqi"
              source-layer="default"
              type={layer.type}
              paint={layer.paint}
              layout={{ visibility: visible ? 'visible' : 'none' }}
              filter={
                wrapFilterWithAll([
                  focusFilter,
                  ...(layer.filter ? cleanFilter(layer.filter) : []),
                ]) as FilterSpecification
              }
            />
          )
        })
      })}
    </Source>
  )
}
