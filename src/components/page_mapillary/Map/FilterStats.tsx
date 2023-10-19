import { $mapLoaded, $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { length } from '@turf/turf'
import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'
import { twJoin } from 'tailwind-merge'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export const FilterStats = () => {
  const { current: mainMap } = useMap()
  const params = useStore($searchParams) as SearchParamsMapillaryMap

  const [stats, setStats] = useState<Record<string, number>>({})
  useEffect(() => {
    if (!mainMap) return

    const features = mainMap
      .getMap()
      .queryRenderedFeatures(undefined)
      ?.filter((feature) => feature.source === 'mapillary-missing-images')
      ?.filter((feature) => feature.layer.id !== 'clicktarget')
    // console.log('Stats Feature Example:', features?.at(0))

    const lengthByGroup: typeof stats = {}
    features?.forEach((feature) => {
      lengthByGroup[params.anzeige] ||= 0
      lengthByGroup[feature.layer.id] += length(feature, { units: 'kilometers' })
      lengthByGroup['sum'] ||= 0
      lengthByGroup['sum'] += length(feature)
    })

    setStats(lengthByGroup)
  }, [params.map])

  // console.log('Stats:', stats)

  const mapLoaded = useStore($mapLoaded)
  if (!mapLoaded) return null
  if (!stats.sum) return null

  const percent = (stats[params.anzeige] || 0) / stats.sum
  const precision = stats.sum < 100 ? 1 : 0

  // Docs on spaces https://stackoverflow.com/a/8515417

  return (
    <dl className="mt-5 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-base font-normal text-gray-900">Vollständigkeit im Kartenausschnitt</dt>
        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
            {stats[params.anzeige]?.toFixed(precision)}
            <span className="ml-2 text-sm font-medium text-gray-500">
              von {stats.sum?.toFixed(precision)}&thinsp;km
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
        </dd>
      </div>
    </dl>
  )
}
// <ArrowUpIcon
//   className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
//   aria-hidden="true"
// />
