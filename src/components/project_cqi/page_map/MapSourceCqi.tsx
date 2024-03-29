import { $clickedMapData, $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import type { FilterSpecification } from 'maplibre-gl'
import { Layer, Source } from 'react-map-gl/maplibre'
import { wrapFilterWithAll } from '../../BaseMap/utils/wrapFilterWithAll'
import { layerByGroups, layersSelected, legendByGroups } from './layers/layers'
import { filterParamsObject, type SearchParamsCqiMap } from './storeCqi'

export const MapSourceCqi = () => {
  const params = useStore($searchParams) as SearchParamsCqiMap
  const mapData = useStore($clickedMapData)
  const mapDataIds = mapData?.map((feature) => feature.properties?.id) ?? []

  // Debugging:
  // console.log(mapDataIds)
  // const map = useMap()
  // console.log(map.current?.getStyle())

  const userFilterGroups: {
    [group: string]: ['in', string, ...(string | number)[]][]
  } = {}
  const filters = filterParamsObject(params.filters)
  const flatLayerGroups = Object.values(legendByGroups)
    .map((groups) => groups)
    .flat()
  if (filters && filters?.length > 0) {
    filters.forEach((filter) => {
      const [groupKey, legendKey] = filter.split('-')
      const filterConfig = flatLayerGroups
        .find((g) => g.key === groupKey)
        ?.legends?.find((l) => l.key === legendKey)?.filterConfig
      if (filterConfig) {
        userFilterGroups[groupKey!] = [
          ...(userFilterGroups[groupKey!] || []),
          ['in', filterConfig.key, ...filterConfig.values],
        ]
      }
    })
  }
  const userFilterExpression = Object.values(userFilterGroups).map((filters) => ['any', ...filters])

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
                ...userFilterExpression,
                ...(layer.filter ? layer.filter : []),
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
                  ...userFilterExpression,
                  ...(layer.filter ? layer.filter : []),
                ]) as FilterSpecification
              }
            />
          )
        })
      })}
    </Source>
  )
}
