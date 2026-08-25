import { addMonths, isAfter } from 'date-fns'
import { z } from 'zod'

const OsmcalDateSchema = z.object({
  start: z.string(),
  end: z.string(),
  human: z.string().optional(),
  human_short: z.string().optional(),
  whole_day: z.boolean().optional(),
})

const OsmcalEventSchema = z
  .object({
    name: z.string(),
    url: z.url(),
    date: OsmcalDateSchema,
    cancelled: z.boolean().optional(),
    location: z
      .object({
        short: z.string().optional(),
        venue: z.string().optional(),
      })
      .optional(),
  })
  .strip()

export type OsmcalEvent = z.infer<typeof OsmcalEventSchema>

export type NextMeetup = {
  name: string
  osmcalUrl: string
  wikiUrl: string
  startIso: string
  endIso: string
  venue: string | null
}

export const MEETUP_TITLE_PREFIX = 'OSM-Verkehrswende'
export const MEETUP_WIKI_URL = 'https://wiki.openstreetmap.org/wiki/Verkehrswende-Meetup#Meetups'

const OSMCAL_EVENTS_URL = 'https://osmcal.org/api/v2/events/?in=de'
const MAX_MONTHS_AHEAD = 3

export function selectNextMeetup(events: OsmcalEvent[], now: Date = new Date()): NextMeetup | null {
  const cutoff = addMonths(now, MAX_MONTHS_AHEAD)

  const candidates = events
    .filter((event) => event.name.startsWith(MEETUP_TITLE_PREFIX))
    .filter((event) => !event.cancelled)
    .map((event) => {
      const start = new Date(event.date.start)
      const end = new Date(event.date.end)
      return { event, start, end }
    })
    .filter(({ start, end }) => Number.isFinite(start.getTime()) && Number.isFinite(end.getTime()))
    // Include the meetup while it is still running; hide once it has ended.
    .filter(({ start, end }) => isAfter(end, now) && !isAfter(start, cutoff))
    .sort((a, b) => a.start.getTime() - b.start.getTime())

  const next = candidates[0]
  if (!next) return null

  return {
    name: next.event.name,
    osmcalUrl: next.event.url,
    wikiUrl: MEETUP_WIKI_URL,
    startIso: next.event.date.start,
    endIso: next.event.date.end,
    venue: next.event.location?.venue ?? next.event.location?.short ?? null,
  }
}

export async function fetchNextMeetupFromOsmcal(
  now: Date = new Date(),
): Promise<NextMeetup | null> {
  const response = await fetch(OSMCAL_EVENTS_URL, {
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'de',
      'Client-App': 'osm-verkehrswende-org/1.0',
    },
  })

  if (!response.ok) {
    throw new Error(`OSMCal request failed: ${response.status} ${response.statusText}`)
  }

  const json: unknown = await response.json()
  const parsed = z.array(OsmcalEventSchema).parse(json)
  return selectNextMeetup(parsed, now)
}

export function isMeetupStillRelevant(meetup: NextMeetup, now: Date = new Date()): boolean {
  const start = new Date(meetup.startIso)
  const end = new Date(meetup.endIso)
  const cutoff = addMonths(now, MAX_MONTHS_AHEAD)
  return isAfter(end, now) && !isAfter(start, cutoff)
}
