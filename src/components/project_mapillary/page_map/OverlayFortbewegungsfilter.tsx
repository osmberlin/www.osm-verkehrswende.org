import { $searchParams } from '@components/BaseMap/store'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Label, Radio, RadioGroup } from '@headlessui/react'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import type { FortbewegungMode, SearchParamsMapillaryMap } from './storeMapillary'

const options: { key: FortbewegungMode; name: string }[] = [
  { key: 'all', name: 'Alle Wege' },
  { key: 'bike', name: 'Fahrrad fahren' },
  { key: 'foot', name: 'Zu Fuß gehen' },
  { key: 'bike_foot', name: 'Fahrrad & zu Fuß' },
  { key: 'car', name: 'Auto fahren' },
]

export const OverlayFortbewegungsfilter = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap
  const [localSelected, setLocalSelected] = useState<FortbewegungMode>('all')

  const fortbewegung = params?.fortbewegung ?? 'all'
  const defaultOpen = fortbewegung !== 'all'

  const setSelected = (value: FortbewegungMode) => {
    $searchParams.open({ ...params, fortbewegung: value })
    setLocalSelected(value)
  }

  useEffect(() => {
    const valid: FortbewegungMode[] = ['all', 'bike', 'foot', 'bike_foot', 'car']
    if (!params.fortbewegung || !valid.includes(params.fortbewegung)) {
      setSelected('all')
    } else {
      setLocalSelected(params.fortbewegung)
    }
  }, [params.fortbewegung])

  return (
    <div className="border-t border-gray-200">
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <div className="flex items-center justify-between">
              <DisclosureButton className="flex grow cursor-pointer gap-1 px-2 py-2 text-sm hover:font-medium">
              <ChevronRightIcon
                className={twJoin(
                  'h-5 w-5 transition-transform',
                  open ? 'rotate-90 transform' : '',
                )}
              />
              Fortbewegungsfilter
              </DisclosureButton>
            </div>
          <DisclosurePanel>
            <RadioGroup
              value={localSelected}
              onChange={(value) => setSelected(value as FortbewegungMode)}
              className="border-x border-gray-200 px-2 pb-4"
              aria-label="Fortbewegungsfilter"
            >
              {options.map(({ key, name }) => (
                <Radio
                  key={key}
                  value={key}
                  className={({ checked }) =>
                    twJoin(
                      '-mt-px',
                      checked ? 'z-10 border-emerald-200 bg-emerald-50' : 'border-gray-200',
                      'relative flex w-full min-w-[19em] cursor-pointer items-center border-t border-b px-4 py-2.5 hover:bg-blue-50 focus:outline-hidden',
                    )
                  }
                >
                  {({ focus, checked }) => (
                    <>
                      <span
                        className={twJoin(
                          checked ? 'border-transparent bg-emerald-600' : 'border-gray-300 bg-white',
                          focus ? 'ring-2 ring-emerald-600 ring-offset-2' : '',
                          'mt-0.5 flex size-4 shrink-0 cursor-pointer items-center justify-center self-start rounded-full border',
                        )}
                        aria-hidden="true"
                      >
                        <span className="size-1.5 rounded-full bg-white" />
                      </span>
                      <Label
                        as="span"
                        className={twJoin(
                          checked ? 'font-medium text-emerald-900' : 'font-normal text-gray-900',
                          'ml-3 text-sm',
                        )}
                      >
                        {name}
                      </Label>
                    </>
                  )}
                </Radio>
              ))}
            </RadioGroup>
          </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
