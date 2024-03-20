import type { BaseMapSearchparams } from '@components/BaseMap/store'
import type { FilterConfig } from './layers/layers'

export const validAnzeigeValues = [
  'cqi',
  'lts', // Level of Traffic Stress
  'incompleteness',
] as const

export type SearchParamsCqiMap = BaseMapSearchparams & {
  anzeige: (typeof validAnzeigeValues)[number]
  filters?: string
}

// TODO: I think we can remove the filterConfig part.
// TODO: I think we can remove the groupKey from the filterConfig object
type Props =
  | {
      filterConfig: FilterConfig
      groupKey?: never
      legendKey?: never
    }
  | {
      filterConfig?: never
      groupKey: string
      legendKey: string
    }
export const filterParamsKey = ({ filterConfig, groupKey, legendKey }: Props) => {
  if (filterConfig) {
    return [filterConfig.groupKey, filterConfig.key].join('-')
  }
  return [groupKey, legendKey].join('-')
}

export const filterParamsStringify = (filters: undefined | (undefined | string)[]) => {
  if (!filters) return undefined

  const clean = filters.filter(Boolean)
  if (clean.length === 0) return undefined

  let separate: string[] = []
  clean.forEach((item) => {
    const separateItems = filterParamsObject(item) || []
    separate = [...separate, ...separateItems]
  })

  const sort = separate.sort()
  return sort?.join(',')
}

export const filterParamsObject = (filterParam: SearchParamsCqiMap['filters']) => {
  if (!filterParam) return undefined
  return filterParam.split(',')
}
