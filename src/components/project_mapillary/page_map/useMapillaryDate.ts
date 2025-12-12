import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { z } from 'zod'

type MapillaryCoverageMeta = {
  // Mapillary Coverage Data From: DateTime String
  ml_data_from: string
}

const MapillaryCoverageMetaSchema = z.object({ ml_data_from: z.coerce.date() }).strip()

const fetchMapillaryDate = async () => {
  const response = await fetch('https://tilda-geo.de/api/processing-dates-mapillary')

  if (!response.ok) {
    throw new Error(`Failed to fetch Mapillary date: ${response.statusText}`)
  }

  const jsonData = await response.json()
  const parsedData = MapillaryCoverageMetaSchema.parse(jsonData)

  const date = parsedData.ml_data_from
  const timestamp = date.getTime()
  const dateString = format(date, 'yyyy-MM-dd')
  const displayDate = format(date, 'dd.MM.yyyy', { locale: de })

  return {
    timestamp,
    dateString,
    displayDate,
  }
}

export const useMapillaryDate = () => {
  const query = useQuery({
    queryKey: ['mapillary-date'],
    queryFn: fetchMapillaryDate,
    staleTime: Infinity, // Never consider data stale
    gcTime: Infinity, // Never garbage collect
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  // Return null if loading or error, otherwise return the data
  return query.isLoading || query.error || !query.data ? null : query.data
}
