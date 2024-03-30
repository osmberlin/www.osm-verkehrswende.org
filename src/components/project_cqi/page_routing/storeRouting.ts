import type { BaseMapSearchparams } from '@components/BaseMap/store'
import type { Feature, LineString, Point } from 'geojson'
import { atom } from 'nanostores'

export type SearchParamsCqiMap = BaseMapSearchparams & {}

// Following https://github.com/dabreegster/ltn/blob/main/web/src/common/snapper/stores.ts
export const $routeToolGj = atom<{
  type: 'FeatureCollection'
  features: (
    | Feature<LineString, { snapped: boolean }>
    | Feature<Point, { type: 'node' }>
    | Feature<Point, { type: 'snapped-waypoint'; name?: string }>
  )[]
  cursor: 'inherit'
  snap_mode: boolean
  undo_length: number
}>({
  type: 'FeatureCollection',
  features: [],
  cursor: 'inherit',
  snap_mode: true,
  undo_length: 1,
})
export const $snapMode = atom(true)
export const $undoLength = atom(0)
