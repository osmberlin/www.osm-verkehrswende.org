import { createSearchParams } from '@nanostores/router'
import { atom } from 'nanostores'
import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'

export const $mapLoaded = atom(false)
export const $clickedMapData = atom<MapGeoJSONFeature[] | undefined>(undefined)

export type SearchParamBaseMap = {
  map: string
}
export type MapSearchParam = { longitude: number; latitude: number; zoom: number }

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
