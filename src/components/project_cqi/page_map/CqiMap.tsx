import { BaseMap, type MapInitialViewState } from '@components/BaseMap/BaseMap'
import { $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useRef } from 'react'
import { NavigationControl } from 'react-map-gl/maplibre'
import { MapInspector } from './MapInspector'
import { MapSourceCqi } from './MapSourceCqi'
import { Overlay } from './Overlay'
import { interactiveLayerIdsByGroup, legendByGroups } from './layers/layers'
import {
  filterParamsKey,
  filterParamsObject,
  filterParamsStringify,
  validAnzeigeValues,
  type SearchParamsCqiMap,
} from './storeCqi'

type Props = {
  maxBounds: MapInitialViewState['maxBounds']
  minZoom: MapInitialViewState['minZoom']
  maxZoom?: MapInitialViewState['maxZoom']
}

export const CqiMap = ({ maxBounds, minZoom, maxZoom }: Props) => {
  const params = useStore($searchParams) as SearchParamsCqiMap

  // Guard against invalid "anzeige" param values
  if (!validAnzeigeValues.includes(params.anzeige)) {
    $searchParams.open({ ...params, ...{ anzeige: 'cqi' } })
  }

  // Initialize default filter
  const initialFilterApplied = useRef(false)
  useEffect(() => {
    if (initialFilterApplied.current) return
    if (!legendByGroups[params.anzeige]) return

    legendByGroups[params.anzeige].forEach((group) => {
      group.legends.forEach((legend) => {
        if (legend?.defaultOn === true && legend.filterConfig) {
          const key = filterParamsKey({ groupKey: group.key, legendKey: legend.key })
          const keyAlreadyFiltered = params?.filters?.includes(key)
          if (!keyAlreadyFiltered) {
            const newFilters = filterParamsStringify([params?.filters, key])
            const newParams = newFilters ? { ...params, ...{ filters: newFilters } } : params
            $searchParams.open(newParams)
          }
        }
      })
    })

    initialFilterApplied.current = true
  }, [params, legendByGroups])

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
      interactiveLayerIds={interactiveLayerIdsByGroup[params?.anzeige] || []}
    >
      <MapSourceCqi />
      <NavigationControl showCompass={false} position="top-right" />
      <MapInspector />
      <Overlay />
    </BaseMap>
  )
}
