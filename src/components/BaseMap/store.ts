import { createSearchParams } from '@components/store/createSearchParams'
import { atom } from 'nanostores'
import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'
import { z } from 'zod'

export const $mapLoaded = atom(false)

export type ClickedMapData = {
  features: MapGeoJSONFeature[]
  lngLat: { lng: number; lat: number }
}
export const $clickedMapData = atom<ClickedMapData | undefined>(undefined)

export type BaseMapSearchparams = {
  map: string
}

export type BaseMapSeachparamsObject = {
  longitude: number
  latitude: number
  zoom: number
}

export const $searchParams = createSearchParams()

export const baseMapSearchparamsStringify = ({
  longitude,
  latitude,
  zoom,
}: BaseMapSeachparamsObject) => {
  // TILDA format: zoom/lat/lng
  return `${zoom}/${latitude}/${longitude}`
}

/**
 * Parse map parameter with migration support for old format.
 * Old format: zoom/lng/lat
 * New format: zoom/lat/lng (matches TILDA)
 *
 * Migration heuristic (Germany only):
 * - If first number after zoom is in longitude range (5-15) and second is in latitude range (47-55),
 *   it's likely the old format and we swap them.
 */
const mapParamsSchema = z
  .string()
  .refine((val) => val.split('/').length >= 3, { message: 'Invalid map parameter format' })
  .transform((val) => {
    const parts = val.split('/')
    return {
      zoom: z.coerce.number().positive().parse(parts[0]),
      lat: z.coerce.number().parse(parts[1]),
      lng: z.coerce.number().parse(parts[2]),
    }
  })

export const baseMapSearchparamsParse = (query: string | undefined) => {
  const result = !query ? { success: false as const } : mapParamsSchema.safeParse(query)
  if (!result.success) {
    return {
      zoom: undefined,
      latitude: undefined,
      longitude: undefined,
    }
  }
  const { zoom, lat, lng } = result.data

  // Migration: detect old format (zoom/lng/lat)
  // Germany longitude: ~5° to ~15° (east)
  // Germany latitude: ~47° to ~55° (north)
  // If lat is in lng range and lng is in lat range, it's old format
  const isLikelyOldFormat = lat >= 5 && lat <= 15 && lng >= 47 && lng <= 55
  if (isLikelyOldFormat) {
    return {
      zoom,
      latitude: lng,
      longitude: lat,
    }
  }

  return {
    zoom,
    latitude: lat,
    longitude: lng,
  }
}
