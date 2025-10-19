import { useQuery } from '@tanstack/react-query'

type MapillaryCoverageMeta = {
  mapillary_coverage_date: string
}

const validateDateFormat = (dateString: string): boolean => {
  // Validate YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(dateString)) {
    return false
  }

  // Validate that it's a real date
  const date = new Date(dateString)
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    date.toISOString().split('T')[0] === dateString
  )
}

const fetchMapillaryDate = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/vizsim/mapillary_coverage/refs/heads/main/output/meta.json',
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch Mapillary date: ${response.statusText}`)
  }

  const data = (await response.json()) as MapillaryCoverageMeta

  // Validate the date format
  if (!validateDateFormat(data.mapillary_coverage_date)) {
    throw new Error(
      `Invalid date format: ${data.mapillary_coverage_date}. Expected YYYY-MM-DD format.`,
    )
  }

  const date = new Date(data.mapillary_coverage_date)
  const timestamp = date.getTime()
  const dateString = data.mapillary_coverage_date // Already in YYYY-MM-DD format
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
