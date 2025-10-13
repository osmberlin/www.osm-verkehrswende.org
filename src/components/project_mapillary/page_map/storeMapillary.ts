import type { BaseMapSearchparams } from '@components/BaseMap/store'

export type SearchParamsMapillaryMap = BaseMapSearchparams & {
  anzeige: 'current_all' | 'current_pano'
}
