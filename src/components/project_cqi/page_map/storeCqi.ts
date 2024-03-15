import type { SearchParamBaseMap } from '@components/BaseMap/store'
import { atom } from 'nanostores'
import type { FilterConfig } from './layers/layers'

export const validAnzeigeValues = [
  'cqi',
  'lts', // Level of Traffic Stress
  'incompleteness',
] as const

export type SearchParamsCqiMap = SearchParamBaseMap & {
  anzeige: (typeof validAnzeigeValues)[number]
}

export const $focus = atom<null | FilterConfig>(null)
