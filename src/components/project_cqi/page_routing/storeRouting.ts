import type { SearchParamBaseMap } from '@components/BaseMap/store'
import type { GeoJSON } from 'geojson'
import { atom } from 'nanostores'

export type SearchParamsCqiMap = SearchParamBaseMap & {}

// Following https://github.com/dabreegster/ltn/blob/main/web/src/common/snapper/stores.ts
export const $routeToolGj = atom<GeoJSON>({
  type: 'FeatureCollection',
  features: [],
})
export const $snapMode = atom(true)
export const $undoLength = atom(0)
