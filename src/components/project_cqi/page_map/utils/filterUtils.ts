import type { LegendGroup } from '../layers/layers'
import { filterParamsKey, filterParamsStringify, type SearchParamsCqiMap } from '../storeCqi'

export const defaultFilterByGroup = (curentLegendGroup: LegendGroup[]) => {
  return curentLegendGroup
    .map((group) =>
      group.legends
        .filter((legend) => legend.defaultOn)
        .map((legend) => filterParamsKey({ groupKey: group.key, legendKey: legend.key })),
    )
    .flat(2)
}

export const paramsWithDefaultFilters = (
  defaultFilters: ReturnType<typeof defaultFilterByGroup>,
  params: SearchParamsCqiMap,
) => {
  const defaultFilter = filterParamsStringify(defaultFilters)
  if (!defaultFilter) {
    delete params.filters
  }
  return defaultFilter ? { ...params, ...{ filters: defaultFilter } } : params
}
