import { $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { FilterStats } from './FilterStats'
import type { SearchParamsMapillaryMap } from './storeMapillary'

export const Filter = () => {
  const params = useStore($searchParams)
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the active state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
  const [selected, setSelected] = useState<SearchParamsMapillaryMap['anzeige']>('complete')

  // Initialize URL with filter=none
  useEffect(() => {
    $searchParams.open({ ...params, ...{ anzeige: params?.anzeige || 'complete' } })
    setSelected((params?.anzeige as SearchParamsMapillaryMap['anzeige']) || 'complete')
  }, [])

  const buttons: { name: string; key: SearchParamsMapillaryMap['anzeige'] }[] = [
    { name: 'Alle Foots', key: 'complete' },
    { name: 'Aktuele Fotos', key: 'completeFresh' },
    { name: 'Alle Panorama-Fotos', key: 'completePano' },
    { name: 'Aktuell Panorama-Fotos', key: 'completeFreshPano' },
  ]

  return (
    <nav className="absolute bottom-10 inset-x-0 items-center justify-center flex">
      <FilterStats />
      <dl className="grid grid-cols-1 divide-y divide-gray-200 rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0">
        {buttons.map((button) => {
          return (
            <button
              key={button.name}
              className={twJoin(
                'px-4 py-5 sm:p-6 text-left w-30 relative first:rounded-l-lg last:rounded-r-lg shadow-inner items-start justify-end flex flex-col',
                selected === button.key
                  ? 'bg-gray-200 shadow-gray-300'
                  : 'cursor-pointer hover:bg-gray-50',
              )}
              onClick={() => {
                $searchParams.open({ ...params, ...{ anzeige: button.key } })
                setSelected(button.key)
              }}
            >
              {selected === button.key && (
                <div className="absolute -top-3 right-1/2 translate-y-1/2 border-8 border-t-0 border-transparent border-b-gray-300">
                  {/* Arrow */}
                </div>
              )}
              <dt className="text-base font-normal text-gray-900 leading-tight">{button.name}</dt>
            </button>
          )
        })}
      </dl>
    </nav>
  )
}
