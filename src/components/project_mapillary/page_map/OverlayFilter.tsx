import { $searchParams } from '@components/BaseMap/store'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/react'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import type { SearchParamsMapillaryMap } from './storeMapillary'

const buttons: { name: string; key: SearchParamsMapillaryMap['anzeige'] }[] = [
  { key: 'complete', name: 'Alle Fotos' },
  { key: 'completeFresh', name: 'Aktuelle Fotos' },
  { key: 'completePano', name: 'Alle Panorama-Fotos' },
  { key: 'completeFreshPano', name: 'Aktuelle Panorama-Fotos' },
]

export const OverlayFilter = () => {
  const params = useStore($searchParams)
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the focus state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
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
    <RadioGroup value={localSelected} onChange={handleChange}>
      <RadioGroupLabel className="sr-only">Filterung der Karte ändern</RadioGroupLabel>
      {buttons.map(({ key, name }, _buttonIdx) => (
        <RadioGroupOption
          key={key}
          value={key}
          className={({ checked }) =>
            twJoin(
              // buttonIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '-mt-px',
              '-mx-px -mt-px',
              // buttonIdx === buttons.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
              checked ? 'z-10 border-emerald-200 bg-emerald-50' : 'border-gray-200',
              'relative flex w-full min-w-[19em] cursor-pointer border px-4 py-2.5 hover:bg-blue-50 focus:outline-none',
            )
          }
        >
          {({ focus, checked }) => (
            <>
              <span
                className={twJoin(
                  checked ? 'border-transparent bg-emerald-600' : 'border-gray-300 bg-white',
                  focus ? 'ring-2 ring-emerald-600 ring-offset-2' : '',
                  'mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border',
                )}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span className="ml-3 flex flex-col">
                <RadioGroupLabel
                  as="div"
                  className={twJoin(
                    checked ? 'font-medium text-emerald-900' : 'font-normal text-gray-900',
                    'text-sm',
                  )}
                >
                  {name}
                </RadioGroupLabel>
                {/* <RadioGroupDescription
                      as="span"
                      className={twJoin(
                        checked ? 'text-emerald-700' : 'text-gray-500',
                        'block text-sm',
                      )}
                    >
                      {setting.description}
                    </RadioGroupDescription> */}
              </span>
            </>
          )}
        </RadioGroupOption>
      ))}
    </RadioGroup>
  )
}
