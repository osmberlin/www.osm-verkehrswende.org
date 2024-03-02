import type { SearchParamBaseMap } from '@components/BaseMap/store'

export type SearchParamsCqiMap = SearchParamBaseMap & {
  anzeige:
    | '1to100'
    | 'lts' // Level of Traffic Stress
    | 'incompleteness'
}
