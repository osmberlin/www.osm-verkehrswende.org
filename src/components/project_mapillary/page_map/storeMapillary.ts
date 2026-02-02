import type { BaseMapSearchparams } from '@components/BaseMap/store'

export type FortbewegungMode = 'all' | 'bike' | 'foot' | 'bike_foot' | 'car'

export type SearchParamsMapillaryMap = BaseMapSearchparams & {
  anzeige: 'current_all' | 'current_pano'
  fortbewegung?: FortbewegungMode
  /** 'off' = hide fresh imagery layer; omit or 'on' = show */
  freshLayer?: 'on' | 'off'
}
