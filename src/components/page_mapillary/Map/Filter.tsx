import { $searchParams } from '@components/BaseMap/store'
import { RadioGroup } from '@headlessui/react'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { FilterStats } from './FilterStats'
import type { SearchParamsMapillaryMap } from './storeMapillary'

const buttons: { name: string; key: SearchParamsMapillaryMap['anzeige'] }[] = [
  { key: 'complete', name: 'Alle Foots' },
  { key: 'completeFresh', name: 'Aktuelle Fotos' },
  { key: 'completePano', name: 'Alle Panorama-Fotos' },
  { key: 'completeFreshPano', name: 'Aktuelle Panorama-Fotos' },
]

export const Filter = () => {
  const params = useStore($searchParams)
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the active state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
  const [localSelected, setLocalSelected] =
    useState<SearchParamsMapillaryMap['anzeige']>('complete')

  const setSelected = (value: string) => {
    $searchParams.open({ ...params, ...{ anzeige: value } })
    setLocalSelected(value as SearchParamsMapillaryMap['anzeige'])
  }

  // Initialize URL with filter=none
  useEffect(() => {
    setSelected(params.anzeige || 'complete')
  }, [])

  const handleChange = (value: SearchParamsMapillaryMap['anzeige']) => {
    setSelected(value)
  }

  return (
    <nav className="absolute left-6 top-6 flex flex-col shadow bg-white rounded-md">
      <RadioGroup value={localSelected} onChange={handleChange}>
        <RadioGroup.Label className="sr-only">Filterung der Karte ändern</RadioGroup.Label>
        {buttons.map(({ key, name }, buttonIdx) => (
          <RadioGroup.Option
            key={key}
            value={key}
            className={({ checked }) =>
              twJoin(
                buttonIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '-mt-px',
                // buttonIdx === buttons.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                checked ? 'z-10 border-emerald-200 bg-emerald-50' : 'border-gray-200',
                'relative w-full flex cursor-pointer border py-2.5 px-4 focus:outline-none hover:bg-blue-50 min-w-[19em]',
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={twJoin(
                    checked ? 'bg-emerald-600 border-transparent' : 'bg-white border-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-emerald-600' : '',
                    'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center  ',
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="div"
                    className={twJoin(
                      checked ? 'text-emerald-900 font-medium' : 'text-gray-900 font-normal',
                      'text-sm',
                    )}
                  >
                    {name}
                  </RadioGroup.Label>
                  {/* <RadioGroup.Description
                      as="span"
                      className={twJoin(
                        checked ? 'text-emerald-700' : 'text-gray-500',
                        'block text-sm',
                      )}
                    >
                      {setting.description}
                    </RadioGroup.Description> */}
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <FilterStats />
    </nav>
  )
}
