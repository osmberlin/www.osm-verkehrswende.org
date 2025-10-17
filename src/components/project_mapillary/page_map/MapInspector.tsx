import { $clickedMapData } from '@components/BaseMap/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useStore } from '@nanostores/react'
import React from 'react'
import { MapInspectorLayers } from './MapInspectorLayers'
import { MapInspectorMapillary } from './MapInspectorMapillary'
import { MAPILLARY_INTERACTIVE_LAYERS } from './MapSourceMapillary'

export const MapInspector: React.FC = () => {
  const clickedMapData = useStore($clickedMapData)

  if (!clickedMapData || clickedMapData.features.length === 0) return null

  return (
    <section className="absolute inset-x-1 bottom-1 z-50 max-h-[80vh] overflow-y-auto rounded-lg bg-blue-900 p-4 shadow-xl sm:inset-x-auto sm:inset-y-2.5 sm:right-2.5 sm:w-96">
      <button
        onClick={() => $clickedMapData.set(undefined)}
        className="absolute top-2.5 right-2.5 z-20 cursor-pointer rounded-full bg-white p-1.5 text-blue-900 hover:bg-blue-50 hover:shadow-lg"
      >
        <XMarkIcon className="size-5" />
        <span className="sr-only">Details ausblenden</span>
      </button>

      {clickedMapData?.features
        .filter(
          (feature, index, self) =>
            index === self.findIndex((f) => f.properties.id === feature.properties.id),
        )
        .map((feature, index) => {
          const layerId = feature.layer?.id

          // Check if this is a Mapillary layer by checking against the interactive layers array
          const isMapillaryLayer = layerId && MAPILLARY_INTERACTIVE_LAYERS.includes(layerId)

          if (isMapillaryLayer) {
            return (
              <div key={feature.properties.id || index}>
                <MapInspectorMapillary feature={feature} clickCoordinates={clickedMapData.lngLat} />
              </div>
            )
          } else {
            return (
              <div key={feature.properties.id || index}>
                <MapInspectorLayers feature={feature} />
              </div>
            )
          }
        })}
    </section>
  )
}
