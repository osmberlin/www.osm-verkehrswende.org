import { $searchParams } from '@components/BaseMap/store'
import { Label, Radio, RadioGroup } from '@headlessui/react'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { formatKm } from './formatKm'
import type { SearchParamsMapillaryMap } from './storeMapillary'
import { useStats } from './useStats'

const buttons: { name: string; key: SearchParamsMapillaryMap['anzeige'] }[] = [
  { key: 'current_all', name: 'Aktuelle Fotos' },
  { key: 'current_pano', name: 'Panorama-Fotos' },
]

export const OverlayFilter = () => {
  const params = useStore($searchParams)
  const { stats } = useStats()
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the focus state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
  const [localSelected, setLocalSelected] =
    useState<SearchParamsMapillaryMap['anzeige']>('current_all')

  const setSelected = (value: string) => {
    $searchParams.open({ ...params, ...{ anzeige: value } })
    setLocalSelected(value as SearchParamsMapillaryMap['anzeige'])
  }

  // Initialize URL with filter=current_all
  useEffect(() => {
    if (
      !params.anzeige ||
      (params.anzeige !== 'current_all' && params.anzeige !== 'current_pano')
    ) {
      setSelected('current_all')
    } else {
      setSelected(params.anzeige)
    }
  }, [])

  const handleChange = (value: SearchParamsMapillaryMap['anzeige']) => {
    setSelected(value)
  }

  return (
    <RadioGroup value={localSelected} onChange={handleChange}>
      <Label className="sr-only">Filterung der Karte ändern</Label>
      {buttons.map(({ key, name }, _buttonIdx) => (
        <Radio
          key={key}
          value={key}
          className={({ checked }) =>
            twJoin(
              // buttonIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '-mt-px',
              '-mx-px -mt-px',
              // buttonIdx === buttons.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
              checked ? 'z-10 border-emerald-200 bg-emerald-50' : 'border-gray-200',
              'relative flex w-full min-w-[19em] cursor-pointer items-center justify-between border px-4 py-2.5 hover:bg-blue-50 focus:outline-hidden',
            )
          }
        >
          {({ focus, checked }) => (
            <>
              <span
                className={twJoin(
                  checked ? 'border-transparent bg-emerald-600' : 'border-gray-300 bg-white',
                  focus ? 'ring-2 ring-emerald-600 ring-offset-2' : '',
                  'mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center self-start rounded-full border',
                )}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span className="ml-3 flex flex-1 flex-col">
                <Label
                  as="div"
                  className={twJoin(
                    checked ? 'font-medium text-emerald-900' : 'font-normal text-gray-900',
                    'text-sm',
                  )}
                >
                  {name}
                </Label>
                <span
                  className={twJoin(
                    checked ? 'text-emerald-700' : 'text-gray-500',
                    'block text-sm',
                  )}
                >
                  {stats[key]?.km === null ? '-' : `${formatKm(stats[key]?.km || 0)} km`}{' '}
                  <span className="text-gray-400">
                    {stats.total?.km === null ? '/ - km' : `/ ${formatKm(stats.total?.km || 0)} km`}
                  </span>
                </span>
              </span>
              <div
                className={twJoin(
                  (stats[key]?.percent || 0) > 0.6
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                  'inline-flex items-end self-end rounded-full px-2.5 py-0.5 text-sm font-medium',
                )}
              >
                {stats[key]?.percent === null
                  ? '-'
                  : `${((stats[key]?.percent || 0) * 100).toFixed(0)}%`}
              </div>
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  )
}
