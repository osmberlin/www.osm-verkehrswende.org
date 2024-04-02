import type { BaseMapSearchparams } from '@components/BaseMap/store'
import type { Feature, LineString } from 'geojson'
import { atom } from 'nanostores'

export type CqiRoutingSearchparams = BaseMapSearchparams & { start: string; end: string }

export type CqiRoutingSearchparamsObject = {
  start: { lng: number; lat: number }
  end: { lng: number; lat: number }
}

export const pointParamsStringify = ({ lng, lat }: { lng: number; lat: number }) => {
  return `${lng},${lat}`
}

export const startEndParamsObject = (
  params: CqiRoutingSearchparams,
  withFallback: {
    start: CqiRoutingSearchparamsObject['start']
    end: CqiRoutingSearchparamsObject['end']
  },
) => {
  const stringToObject = (input: string) => {
    const point = input.split(',').map(Number)
    return { lng: point[0]!, lat: point[1]! }
  }

  return {
    start: params?.start ? stringToObject(params.start) : withFallback.start,
    end: params?.end ? stringToObject(params.end) : withFallback.end,
  }
}

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
