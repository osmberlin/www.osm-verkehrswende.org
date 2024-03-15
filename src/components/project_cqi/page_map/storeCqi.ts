import type { SearchParamBaseMap } from '@components/BaseMap/store'
import { atom } from 'nanostores'
import type { FilterConfig } from './layers/layers'

export type SearchParamsCqiMap = SearchParamBaseMap & {
  anzeige:
    | 'cqi'
    | 'lts' // Level of Traffic Stress
    | 'incompleteness'
}

export const $focus = atom<null | FilterConfig>(null)
