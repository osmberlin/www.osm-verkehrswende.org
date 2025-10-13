import { $mapLoaded, $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { length } from '@turf/turf'
import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'
import { mapSources } from './MapSourceLayers'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export type Stat = { km: number | null; percent: number | null }
export type Stats = {
  total: Stat
  current_all: Stat
  current_pano: Stat
}

export const useStats = () => {
  const { current: mainMap } = useMap()
  const mapLoaded = useStore($mapLoaded)
  const params = useStore($searchParams) as SearchParamsMapillaryMap

  const [stats, setStats] = useState<Stats>({
    total: { km: null, percent: null },
    current_all: { km: null, percent: null },
    current_pano: { km: null, percent: null },
  })
  const [currentZoom, setCurrentZoom] = useState<number>(0)

  const fetchOrUpdateStats = () => {
    if (!mainMap) return
    if (!mapLoaded) return

    const zoom = mainMap.getMap().getZoom()
    setCurrentZoom(zoom)

    // Don't calculate stats for zoom levels lower than 11
    if (zoom < 11) {
      setStats({
        total: { km: null, percent: null },
        current_all: { km: null, percent: null },
        current_pano: { km: null, percent: null },
      })
      return
    }

    // Get all coverage layers for statistics
    const coverageLayerNames = mapSources.map((source) => `${source.id}-coverage`)

    const features = mainMap.getMap().queryRenderedFeatures({
      layers: coverageLayerNames,
    })

    const lengthByGroup = {
      total: { km: 0, percent: 1 },
      current_all: { km: 0, percent: 0 },
      current_pano: { km: 0, percent: 0 },
    }
    let totalKm = 0

    // Group features by their coverage type
    for (const feature of features) {
      // Apply roadPropertyExclude based on source type
      const layerId = feature.layer.id
      const sourceId = layerId.replace('-coverage', '')
      const source = mapSources.find((s) => s.id === sourceId)

      if (source?.roadPropertyExclude || source?.roadPropertyAllow) {
        const road = feature.properties?.road

        // Skip if road type is in the exclude list
        if (source.roadPropertyExclude && road && source.roadPropertyExclude.includes(road)) {
          continue
        }

        // Skip if road type is NOT in the allow list (only show allowed types)
        if (source.roadPropertyAllow && road && !source.roadPropertyAllow.includes(road)) {
          continue
        }
      }

      // Get the coverage type from the feature properties
      const coverage = feature.properties?.mapillary_coverage
      const featureLength = length(feature, { units: 'kilometers' })

      // Add to total (all features)
      totalKm += featureLength

      // Group by coverage type
      if (coverage === 'pano') {
        // Pano coverage counts for both current_all and current_pano
        lengthByGroup.current_all.km += featureLength
        lengthByGroup.current_pano.km += featureLength
      } else if (coverage === 'regular') {
        // Regular coverage only counts for current_all
        lengthByGroup.current_all.km += featureLength
      } else if (coverage === null || coverage === '') {
        // Missing coverage - don't count in covered statistics
        continue
      }
    }

    // Set total
    lengthByGroup.total = { km: totalKm, percent: 1 }

    // Calculate percentages
    if (totalKm > 0) {
      lengthByGroup.current_all.percent = lengthByGroup.current_all.km / totalKm
      lengthByGroup.current_pano.percent = lengthByGroup.current_pano.km / totalKm
    }

    // Debug logging
    // console.log('Stats Debug:', {
    //   totalKm,
    //   current_all: lengthByGroup.current_all,
    //   current_pano: lengthByGroup.current_pano,
    // })

    setStats(lengthByGroup as Stats)
  }

  useEffect(() => {
    fetchOrUpdateStats()
  }, [mapLoaded, params.map])

  useEffect(() => {
    if (!mainMap) return

    const handleZoom = () => {
      fetchOrUpdateStats()
    }

    mainMap.getMap().on('zoom', handleZoom)
    mainMap.getMap().on('moveend', handleZoom)

    return () => {
      mainMap.getMap().off('zoom', handleZoom)
      mainMap.getMap().off('moveend', handleZoom)
    }
  }, [mainMap])

  return {
    stats,
    currentZoom,
    mapLoaded,
  }
}
