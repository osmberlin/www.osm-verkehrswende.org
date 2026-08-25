import { useEffect, useState } from 'react'
import { formatMeetupCountdown, formatMeetupDateTimeRange } from './formatMeetupCountdown'
import { MeetupQueryClient } from './MeetupQueryClient'
import {
  buildTimeZoneOptions,
  getBrowserTimeZone,
  readStoredTimeZone,
  writeStoredTimeZone,
} from './timezones'
import { useNextMeetup } from './useNextMeetup'

function NextMeetupCalloutInner() {
  const { data: meetup, isPending, isError } = useNextMeetup()
  const [timeZone, setTimeZone] = useState(() => readStoredTimeZone() ?? getBrowserTimeZone())
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  if (isPending || isError || !meetup) return null

  const dateTimeLabel = formatMeetupDateTimeRange(meetup.startIso, meetup.endIso, timeZone)
  const countdown = formatMeetupCountdown(meetup.startIso, meetup.endIso, now)
  if (!countdown) return null

  const timeZoneOptions = buildTimeZoneOptions(getBrowserTimeZone())

  return (
    <section
      className="notice prose-sm mt-16 bg-emerald-100"
      aria-labelledby="next-meetup-heading"
      data-component="NextMeetupCallout"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 id="next-meetup-heading" className="mt-0! mb-1 text-base font-semibold text-sky-800">
            Nächstes Meetup
          </h2>
          <p className="m-0! text-lg font-semibold text-gray-900">{meetup.name}</p>
          <p className="m-0! mt-1 text-gray-800">
            {dateTimeLabel}
            {meetup.venue ? ` · ${meetup.venue}` : ''}
          </p>
          <p className="m-0! mt-1 font-medium text-emerald-900" aria-live="polite">
            {countdown}
          </p>
          <p className="m-0! mt-2">
            <a
              href={meetup.wikiUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-sky-800 underline-offset-2 hover:underline"
            >
              Wiki: Termine und Infos
            </a>
            <span className="text-gray-500"> · </span>
            <a
              href={meetup.osmcalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-800 underline-offset-2 hover:underline"
            >
              OSMCal
            </a>
          </p>
        </div>

        <label className="flex shrink-0 flex-col gap-1 text-sm text-gray-700 sm:items-end">
          <span className="font-medium">Zeitzone</span>
          <select
            className="max-w-full rounded-sm border-gray-300 bg-white py-1.5 pr-8 pl-2 text-sm text-gray-900 shadow-none focus:border-teal-600 focus:ring-teal-600"
            value={timeZone}
            onChange={(event) => {
              const next = event.target.value
              setTimeZone(next)
              writeStoredTimeZone(next)
            }}
          >
            {timeZoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

export function NextMeetupCallout() {
  return (
    <MeetupQueryClient>
      <NextMeetupCalloutInner />
    </MeetupQueryClient>
  )
}
