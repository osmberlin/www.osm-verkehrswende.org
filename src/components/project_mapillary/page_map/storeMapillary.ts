import type { BaseMapSearchparams } from '@components/BaseMap/store'

export type SearchParamsMapillaryMap = BaseMapSearchparams & {
  anzeige: 'complete' | 'completePano' | 'completeFresh' | 'completeFreshPano'
}
