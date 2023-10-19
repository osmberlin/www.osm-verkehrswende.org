import type { SearchParamBaseMap } from '@components/BaseMap/store'

export type SearchParamsMapillaryMap = SearchParamBaseMap & {
  anzeige: 'complete' | 'completePano' | 'completeFresh' | 'completeFreshPano'
}
