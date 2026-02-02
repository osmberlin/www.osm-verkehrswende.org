import { destination } from '@turf/turf'

const BASE_URL = 'https://vizsim.github.io/missing_mapillary_gh-routing/'

/** ~3 km east of start (DE-only, approximate) */
const DEFAULT_END_DISTANCE_KM = 3
const BEARING_EAST_DEG = 90

export type RoutePlanningParams = {
  zoom: number
  lat: number
  lng: number
  startLat: number
  startLng: number
  /** When true, append end = start + 3 km east (Turf, DE-approx) */
  addDefaultEnd?: boolean
}

export function buildRoutePlanningUrl({
  zoom,
  lat,
  lng,
  startLat,
  startLng,
  addDefaultEnd = false,
}: RoutePlanningParams): string {
  const map = `${zoom}/${lat}/${lng}`
  const start = `${startLat}/${startLng}`
  const params = new URLSearchParams({
    map,
    start,
    profile: 'bike_customizable',
    mapillary_weight: '0.2',
  })
  if (addDefaultEnd) {
    const startPoint = [startLng, startLat] as [number, number]
    const endPoint = destination(startPoint, DEFAULT_END_DISTANCE_KM, BEARING_EAST_DEG, {
      units: 'kilometers',
    })
    const [endLng, endLat] = endPoint.geometry.coordinates
    params.set('end', `${endLat}/${endLng}`)
  }
  return `${BASE_URL}?${params.toString()}`
}
