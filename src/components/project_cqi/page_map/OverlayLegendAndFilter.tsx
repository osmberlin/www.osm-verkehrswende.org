import { $searchParams } from '@components/BaseMap/store'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { legendByGroups } from './layers/layers'
import {
  filterParamsKey,
  filterParamsObject,
  filterParamsStringify,
  type CqiMapSearchparams,
} from './storeCqi'
import { defaultFilterByGroup, paramsWithDefaultFilters } from './utils/filterUtils'

export const OverlayLegendAndFilter = () => {
  const params = useStore($searchParams) as CqiMapSearchparams
  const curentLegendGroup = legendByGroups[params?.anzeige ?? 'cqi']

  // const map = useMap()
  // console.log(map.current?.getStyle())

  const legendDefaultClosedOnSmallScreen = typeof window !== 'undefined' && window.innerWidth < 1024

  const filters = filterParamsObject(params.filters)

  const handleClick = (key: string) => {
    const active = filters?.includes(key)
    if (active) {
      // remove
      const newFilterString = filterParamsStringify(filters?.filter((f) => f !== key))
      if (!newFilterString) {
        delete params.filters
      }
      const newParams = newFilterString ? { ...params, ...{ filters: newFilterString } } : params
      $searchParams.open(newParams)
    } else {
      // add
      const filterString = filterParamsStringify([params?.filters, key])
      const newParams = filterString ? { ...params, ...{ filters: filterString } } : params
      $searchParams.open(newParams)
    }
  }

  // State if no filter is active except the default filter.
  const defaultFilters = defaultFilterByGroup(curentLegendGroup)
  const currentNonDefaultFilter = filters?.filter((f) => !defaultFilters.includes(f))
  const noUserFilter = currentNonDefaultFilter ? currentNonDefaultFilter?.length === 0 : true

  const resetFilter = () => {
    const newParams = paramsWithDefaultFilters(defaultFilters, params)
    $searchParams.open(newParams)
  }

  return (
    <Disclosure defaultOpen={!legendDefaultClosedOnSmallScreen}>
      {({ open }) => (
        <>
          <div className="flex items-center justify-between">
            <DisclosureButton className="flex grow gap-1 px-2 py-2 text-sm hover:font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={twJoin(
                  'h-5 w-5 transition-transform',
                  open ? 'rotate-90 transform' : '',
                )}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              Legende
            </DisclosureButton>
            {!noUserFilter && (
              <>
                <button
                  onClick={resetFilter}
                  className="mr-1 underline decoration-yellow-500 underline-offset-2 hover:decoration-2"
                >
                  Filter löschen
                </button>
              </>
            )}
          </div>
          <DisclosurePanel>
            {curentLegendGroup.map((legendGroup) => {
              return (
                <div key={`${params.anzeige}-${legendGroup.title}`}>
                  <h2 className={legendGroup.primary ? 'sr-only' : 'px-2 pb-2 text-sm'}>
                    {legendGroup.title}
                  </h2>
                  <ul
                    className={twJoin(
                      'group/legend px-2 pb-4 text-sm font-normal leading-4 text-gray-900',
                    )}
                  >
                    {legendGroup.legends.map((legend) => {
                      const key = filterParamsKey({
                        groupKey: legendGroup.key,
                        legendKey: legend.key,
                      })
                      const filteringEnabled = legend.filterConfig !== null
                      const filterActive = filters?.includes(key)

                      return (
                        <li
                          key={`${legend.label}-${legend.color}`}
                          className={twJoin(
                            'flex items-center justify-between gap-2',
                            filteringEnabled ? 'group/focus cursor-pointer' : '',
                          )}
                          onClick={() => filteringEnabled && handleClick(key)}
                        >
                          <div className="items-top flex gap-2">
                            <div
                              className="mt-1 h-2 w-7 rounded-full"
                              style={{ backgroundColor: legend.color }}
                            />
                            <span>{legend.label}</span>
                          </div>
                          {filteringEnabled && (
                            <button
                              className={twJoin(
                                'rounded-md border border-white p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 group-hover/focus:border-gray-200 group-hover/focus:bg-blue-50 group-hover/legend:text-gray-800',
                                filterActive ? 'text-yellow-500' : 'text-gray-300',
                              )}
                            >
                              {filterActive ? (
                                <svg
                                  // Heroicon Solid light-bulb
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-4"
                                >
                                  <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  // Heroicon Outline light-bulb
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                                  />
                                </svg>
                              )}
                            </button>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
