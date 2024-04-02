import type { BaseMapSearchparams } from '@components/BaseMap/store'

export const validAnzeigeValues = [
  'cqi',
  'lts', // Level of Traffic Stress
  'incompleteness',
] as const

export type CqiMapSearchparams = BaseMapSearchparams & {
  anzeige: (typeof validAnzeigeValues)[number]
  filters?: string
}

type Props = {
  groupKey: string
  legendKey: string
}
export const filterParamsKey = ({ groupKey, legendKey }: Props) => {
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

export const filterParamsObject = (filterParam: CqiMapSearchparams['filters']) => {
  if (!filterParam) return undefined
  return filterParam.split(',')
}
