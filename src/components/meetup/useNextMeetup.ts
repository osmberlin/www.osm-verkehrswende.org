import { useQuery } from '@tanstack/react-query'
import { fetchNextMeetupFromOsmcal } from './osmcal'

/** In-memory only: a hard reload creates a new QueryClient and fetches again. */
const SESSION_STALE_MS = 24 * 60 * 60 * 1000

export function useNextMeetup() {
  return useQuery({
    queryKey: ['next-meetup'],
    queryFn: () => fetchNextMeetupFromOsmcal(),
    staleTime: SESSION_STALE_MS,
    gcTime: SESSION_STALE_MS,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
  })
}
