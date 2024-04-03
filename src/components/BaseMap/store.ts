import { createSearchParams } from '@components/store/createSearchParams'
import { atom } from 'nanostores'
import type { MapGeoJSONFeature } from 'react-map-gl/maplibre'

export const $mapLoaded = atom(false)
export const $clickedMapData = atom<MapGeoJSONFeature[] | undefined>(undefined)

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
  return `${zoom}/${longitude}/${latitude}`
}

export const baseMapSearchparamsParse = (query: string | undefined) => {
  return {
    zoom: query ? Number(query.split('/')[0]) : undefined,
    longitude: query ? Number(query.split('/')[1]) : undefined,
    latitude: query ? Number(query.split('/')[2]) : undefined,
  }
}
