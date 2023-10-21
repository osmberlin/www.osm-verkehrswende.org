import { $mapLoaded, $searchParams } from '@components/BaseMap/store'
import { SmallSpinner } from '@components/Spinner/SmallSpinner'
import { useStore } from '@nanostores/react'
import { length } from '@turf/turf'
import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'
import { twJoin } from 'tailwind-merge'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export const FilterStats = () => {
  const { current: mainMap } = useMap()
  const mapLoaded = useStore($mapLoaded)
  const params = useStore($searchParams) as SearchParamsMapillaryMap

  const [stats, setStats] = useState<Record<string, number>>({})

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
      layers: ['complete', 'completePano', 'completeFresh', 'completeFreshPano'],
    })
    // console.log('Stats Feature Example:', features?.at(0), params.anzeige)

    const lengthByGroup: typeof stats = {}
    features?.forEach((feature) => {
      lengthByGroup[feature.layer.id] ||= 0
      lengthByGroup[feature.layer.id] += length(feature, { units: 'kilometers' })
      lengthByGroup.sum ||= 0
      lengthByGroup.sum += length(feature)
    })

    setStats(lengthByGroup)
  }

  useEffect(() => {
    fetchOrUpdateStats()
  }, [mapLoaded, params.map])

  let percent = 0
  let precision = 0
  if (stats.sum) {
    percent = (stats[params.anzeige] || 0) / stats.sum
    precision = stats.sum < 100 ? 1 : 0
  }

  // console.log('Stats:', stats, params.anzeige)
  return (
    <dl className="overflow-hidden rounded-b-md">
      <div className="px-2 pt-4 pb-2">
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
                {stats[params.anzeige]?.toFixed(precision)}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  / {stats.sum?.toFixed(precision)}&thinsp;km
                </span>
              </div>
              <div
                className={twJoin(
                  percent > 0.6 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                )}
              >
                <span className="sr-only">Es fehlen</span>
                {percent.toLocaleString('DE', { style: 'percent' })}
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
