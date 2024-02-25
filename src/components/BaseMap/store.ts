import { createSearchParams } from '@nanostores/router'
import { atom } from 'nanostores'
import type { LngLatBoundsLike, MapGeoJSONFeature } from 'react-map-gl/maplibre'

export const $mapLoaded = atom(false)
export const $clickedMapData = atom<MapGeoJSONFeature[] | undefined>(undefined)

export type SearchParamBaseMap = {
  map: string
}
export type MapSearchParam = {
  longitude: number
  latitude: number
  zoom: number
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#setmaxbounds
  maxBounds?: LngLatBoundsLike
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#setminzoom
  minZoom?: number
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#setmaxzoom
  maxZoom?: number
}

export const $searchParams = createSearchParams()

export const paramMapStringify = ({ longitude, latitude, zoom }: MapSearchParam) => {
  return `${zoom}/${longitude}/${latitude}`
}

export const paramMapParse = (query: string | undefined) => {
  return {
    zoom: query ? Number(query.split('/')[0]) : undefined,
    longitude: query ? Number(query.split('/')[1]) : undefined,
    latitude: query ? Number(query.split('/')[2]) : undefined,
  }
}
