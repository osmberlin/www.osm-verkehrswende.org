import type { SearchParamBaseMap } from '@components/BaseMap/store'

export type SearchParamsCqiMap = SearchParamBaseMap & {
  anzeige: 'complete' | 'completePano' | 'completeFresh' | 'completeFreshPano'
}
