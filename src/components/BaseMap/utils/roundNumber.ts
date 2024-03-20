import type { BaseMapSeachparamsObject } from '../store'

export const roundNumber = (number: number | string, precision?: number) => {
  if (typeof number === 'string') {
    return Number.parseFloat(Number.parseFloat(number).toFixed(precision))
  } else {
    return Number.parseFloat(number.toFixed(precision))
  }
}

const roundByZoom = (number: number | string, zoom: number) => {
  // Keep URL as clean as possible. Relevant zoom changes below 13 are in 3 digits; then 4; after 17+ we need 5.
  const latLngPrecisionByZoom = zoom >= 17 ? 5 : zoom < 13 ? 3 : 4

  return roundNumber(number, latLngPrecisionByZoom)
}

export const roundPositionForURL = ({ longitude, latitude, zoom }: BaseMapSeachparamsObject) => {
  longitude = roundByZoom(longitude, zoom)
  latitude = roundByZoom(latitude, zoom)
  zoom = roundNumber(zoom, 1)
  return {
    longitude,
    latitude,
    zoom,
  } satisfies BaseMapSeachparamsObject
}
