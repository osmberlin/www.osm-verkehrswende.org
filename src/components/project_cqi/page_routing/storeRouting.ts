import type { GeoJSON } from 'geojson'
import type { SearchParamBaseMap } from '@components/BaseMap/store'
import { atom } from 'nanostores'
import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'

export type SearchParamsCqiMap = SearchParamBaseMap & {}

// Following https://github.com/dabreegster/ltn/blob/main/web/src/common/snapper/stores.ts
export const $routeToolGj = atom<GeoJSON>({
  type: 'FeatureCollection',
  features: [],
})
export const $snapMode = atom(true)
export const $undoLength = atom(0)
