import { $searchParams } from '@components/BaseMap/store'
import { Description, Label, Radio, RadioGroup } from '@headlessui/react'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { layerSelection, legendByGroups } from './layers/layers'
import { type CqiMapSearchparams } from './storeCqi'
import { defaultFilterByGroup, paramsWithDefaultFilters } from './utils/filterUtils'

export const OverlayLayerSelection = () => {
  const params = useStore($searchParams) as CqiMapSearchparams
  // TODO: I really don't get why we need this but something prevents the rerendering of the buttons so the focus state is wrong. Did not find any AstroJS Docs on this. And we are doing what we are supposed to do with nanostores.
  const [localSelected, setLocalSelected] = useState<CqiMapSearchparams['anzeige']>('cqi')

  const setSelected = (value: CqiMapSearchparams['anzeige']) => {
    params.anzeige = value
    const curentLegendGroup = legendByGroups[params?.anzeige ?? 'cqi']
    const defaultFilters = defaultFilterByGroup(curentLegendGroup)
    const newParams = paramsWithDefaultFilters(defaultFilters, params)
    $searchParams.open(newParams)
    setLocalSelected(value)
  }

  // Initialize URL with filter=none
  useEffect(() => {
    setSelected(params.anzeige || 'cqi')
  }, [])

  const handleChange = (value: CqiMapSearchparams['anzeige']) => {
    setSelected(value)
  }

  return (
    <RadioGroup
      value={localSelected}
      onChange={handleChange}
      aria-label="Filterung der Karte ändern"
    >
      {layerSelection.map(({ key, name, description }) => (
        <Radio
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
                <Label
                  as="div"
                  className={twJoin(
                    checked ? 'font-medium text-emerald-900' : 'font-normal text-gray-900',
                    'text-sm',
                  )}
                >
                  {name}
                </Label>

                {checked && (
                  <Description
                    as="span"
                    className={twJoin(
                      checked ? 'text-emerald-700' : 'text-gray-500',
                      'block text-sm',
                    )}
                  >
                    {description}
                  </Description>
                )}
              </span>
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  )
}
