import { $mapLoaded, $searchParams } from '@components/BaseMap/store'
import { SmallSpinner } from '@components/Spinner/SmallSpinner'
import { useStore } from '@nanostores/react'
import { length } from '@turf/turf'
import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'
import { twJoin } from 'tailwind-merge'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export const OverlayStats = () => {
  const { current: mainMap } = useMap()
  const mapLoaded = useStore($mapLoaded)
  const params = useStore($searchParams) as SearchParamsMapillaryMap

  type Stat = { km: number; percent: number }
  const [stats, setStats] = useState<Record<string, Stat>>({})

  const fetchOrUpdateStats = () => {
    if (!mainMap) return
    if (!mapLoaded) return

    // We have to hack around some race condition here.
    // I tried first to only query the params.anzeige layer for features.
    // This used layer.layout.visibility to toggle the layer.
    // However, changing the filter did not update the `queryRenderedFeatures` results.
    // Our solution now is…
    // 1. toggle the layer visibility by line-opacity, so all are queriable here
    // 2. alway calculate the stats for all 'anzeige' filter but only show the current one
    const features = mainMap.getMap().queryRenderedFeatures({
      layers: [
        'clicktargetAndStatsTotal',
        'complete',
        'completePano',
        'completeFresh',
        'completeFreshPano',
      ],
    })
    // console.log('Stats Feature Example:', features?.at(0), params.anzeige)

    const lengthByGroup: typeof stats = {}
    for (const feature of features) {
      lengthByGroup[feature.layer.id] ||= { km: 0, percent: 0 }
      lengthByGroup[feature.layer.id]!.km += length(feature, { units: 'kilometers' })
    }

    for (const groupKey of Object.keys(lengthByGroup)) {
      lengthByGroup[groupKey]!.percent =
        lengthByGroup[groupKey]!.km / lengthByGroup.clicktargetAndStatsTotal!.km
    }

    setStats(lengthByGroup)
  }

  useEffect(() => {
    fetchOrUpdateStats()
  }, [mapLoaded, params.map])

  // console.log('Stats:', stats, params.anzeige)
  return (
    <dl className="overflow-hidden rounded-b-md">
      <div className="px-2 pb-2 pt-4">
        <dt className="text-sm font-normal leading-tight text-gray-900">
          Vollständigkeit <br />
          im Kartenausschnitt
        </dt>
        <dd
          className={twJoin(
            'mt-1 flex min-h-[3em]',
            mapLoaded ? 'items-baseline justify-between' : 'items-center justify-center',
          )}
        >
          {mapLoaded ? (
            <>
              <div className="flex items-baseline text-2xl font-semibold text-emerald-600">
                {stats[params.anzeige]?.km.toFixed((stats[params.anzeige]?.km || 0) < 100 ? 1 : 0)}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  /{' '}
                  {stats.clicktargetAndStatsTotal?.km.toFixed(
                    stats.clicktargetAndStatsTotal.km < 100 ? 1 : 0,
                  )}
                  &thinsp;km
                </span>
              </div>
              <div
                className={twJoin(
                  (stats[params.anzeige]?.percent || 0) > 0.6
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                )}
              >
                <span className="sr-only">Es fehlen</span>
                {stats[params.anzeige]?.percent.toLocaleString('DE', { style: 'percent' })}
              </div>
            </>
          ) : (
            <SmallSpinner />
          )}
        </dd>
      </div>
    </dl>
  )
}
