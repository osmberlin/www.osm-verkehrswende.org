import type { BaseMapSearchparams } from '@components/BaseMap/store'
import type { Feature, LineString } from 'geojson'
import { atom } from 'nanostores'

export type SearchParamsCqiMap = BaseMapSearchparams & {}

// // === renderGeojson() ===
// export const $routeToolGj = atom<{
//   type: 'FeatureCollection'
//   features: (
//     | Feature<LineString, { snapped: boolean }>
//     | Feature<Point, { type: 'node' }>
//     | Feature<Point, { type: 'snapped-waypoint'; name?: string }>
//   )[]
//   cursor: 'inherit'
//   snap_mode: boolean
//   undo_length: number
// }>({
//   type: 'FeatureCollection',
//   features: [],
//   cursor: 'inherit',
//   snap_mode: true,
//   undo_length: 1,
// })

// === toFinalFeature() ===
export const $routeToolGj = atom<
  Feature<
    LineString,
    {
      length_meters: number
      route_name: string
      waypoints: { lat: number; lon: number; snapped: boolean }[]
    }
  >
>({
  type: 'Feature',
  geometry: { coordinates: [], type: 'LineString' },
  properties: { length_meters: 0, route_name: '', waypoints: [] },
})
export const $snapMode = atom(true)
export const $undoLength = atom(0)
