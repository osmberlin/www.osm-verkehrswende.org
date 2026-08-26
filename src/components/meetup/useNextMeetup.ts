import { useQuery } from '@tanstack/react-query'
import { fetchNextMeetupFromOsmcal, isMeetupStillRelevant, type NextMeetup } from './osmcal'

const CACHE_KEY = 'osm-vw-next-meetup'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000

type CachedMeetup = {
  fetchedAt: number
  meetup: NextMeetup | null
}

function readCachedMeetup(now: Date): CachedMeetup | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as CachedMeetup
    if (typeof parsed.fetchedAt !== 'number') return null
    if (Date.now() - parsed.fetchedAt >= CACHE_TTL_MS) return null

    if (parsed.meetup !== null && !isMeetupStillRelevant(parsed.meetup, now)) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

function writeCachedMeetup(meetup: NextMeetup | null): void {
  try {
    const payload: CachedMeetup = { fetchedAt: Date.now(), meetup }
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    // Ignore quota / private mode failures.
  }
}

async function loadNextMeetup(): Promise<NextMeetup | null> {
  const now = new Date()
  const cached = readCachedMeetup(now)
  if (cached) return cached.meetup

  const meetup = await fetchNextMeetupFromOsmcal(now)
  // Only cache successful hits so newly published meetups appear quickly
  // after a period with no upcoming date.
  if (meetup) writeCachedMeetup(meetup)
  return meetup
}

export function useNextMeetup() {
  return useQuery({
    queryKey: ['next-meetup'],
    queryFn: loadNextMeetup,
    staleTime: CACHE_TTL_MS,
    gcTime: CACHE_TTL_MS,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 2,
  })
}
