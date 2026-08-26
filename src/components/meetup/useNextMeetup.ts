import { useQuery } from '@tanstack/react-query'
import { fetchNextMeetupFromOsmcal } from './osmcal'

/** In-memory QueryClient: a hard reload creates a new island client and fetches again. */
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
