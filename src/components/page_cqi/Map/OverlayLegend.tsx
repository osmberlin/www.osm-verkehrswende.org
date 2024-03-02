import { $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { legendByGroups } from './layers/layers'
import type { SearchParamsCqiMap } from './storeCqi'

export const OverlayLegend = () => {
  const params = useStore($searchParams) as SearchParamsCqiMap
  const curentLegend = legendByGroups[params?.anzeige ?? '1to100']

  return (
    <ul className="space-y-2 px-2 py-4 text-sm font-normal leading-4 text-gray-900">
      {curentLegend.map((legend) => {
        return (
          <li key={legend.label} className="items-top flex gap-2">
            <div className="mt-1 h-2 w-7 rounded-full" style={{ backgroundColor: legend.color }} />
            <span>{legend.label}</span>
          </li>
        )
      })}
    </ul>
  )
}
