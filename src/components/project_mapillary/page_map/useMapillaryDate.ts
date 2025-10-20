import { useQuery } from '@tanstack/react-query'

type MapillaryCoverageMeta = {
  // Mapillary Coverage Data From: DateTime String
  ml_data_from: string
}

const validateDateFormat = (dateString: string): boolean => {
  // Validate ISO timestamp format
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime()) && date.toISOString() === dateString
}

const fetchMapillaryDate = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/vizsim/mapillary_coverage/refs/heads/main/ml_metadata.json',
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch Mapillary date: ${response.statusText}`)
  }

  const data = (await response.json()) as MapillaryCoverageMeta

  // Validate the date format
  if (!validateDateFormat(data.ml_data_from)) {
    throw new Error(`Invalid date format: ${data.ml_data_from}. Expected ISO timestamp format.`)
  }

  const date = new Date(data.ml_data_from)
  const timestamp = date.getTime()
  const dateString = date.toISOString().split('T')[0] // Convert to YYYY-MM-DD format
  const displayDate = date.toLocaleDateString('de-DE')

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
