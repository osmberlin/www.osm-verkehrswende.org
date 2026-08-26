import { QueryClientRoot } from '@components/QueryClientRoot'
import { useState } from 'react'
import { formatMeetupCountdown, formatMeetupDateTime } from './formatMeetupCountdown'
import { getBrowserTimeZone, TimeZonePicker } from './TimeZonePicker'
import { useNextMeetup } from './useNextMeetup'

const MEETUP_WIKI_URL = 'https://wiki.openstreetmap.org/wiki/Verkehrswende-Meetup#Meetups'

function NextMeetupCalloutInner() {
  const { data: meetup, isPending } = useNextMeetup()
  const [timeZone, setTimeZone] = useState(() => getBrowserTimeZone())

  const hasMeetup = Boolean(meetup)
  const countdown = meetup != null ? formatMeetupCountdown(meetup.startIso, meetup.endIso) : null
  const dateLabel = meetup != null ? formatMeetupDateTime(meetup.startIso, timeZone) : null
  const href = meetup?.osmcalUrl ?? MEETUP_WIKI_URL

  return (
    <section
      className="flex items-center justify-between gap-2 rounded-sm bg-gray-100 px-4 py-3"
      aria-label="Nächster Termin"
      data-component="NextMeetupCallout"
    >
      <div className="flex min-h-8 min-w-0 grow items-center">
        {isPending ? (
          <p className="m-0 leading-none text-gray-600">Nächster Termin: …</p>
        ) : hasMeetup && dateLabel ? (
          <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 leading-none text-gray-900">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-sky-800 underline-offset-2 hover:underline"
            >
              Nächster Termin: {dateLabel}
            </a>
            {countdown ? (
              <span className="text-sm font-medium text-emerald-800" aria-live="polite">
                {countdown}
              </span>
            ) : null}
          </p>
        ) : (
          <p className="m-0 leading-none text-gray-900">
            <a
              href={MEETUP_WIKI_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-sky-800 underline-offset-2 hover:underline"
            >
              Nächster Termin: Bitte schau im Wiki nach
            </a>
          </p>
        )}
      </div>

      {meetup != null ? (
        <TimeZonePicker startIso={meetup.startIso} timeZone={timeZone} onChange={setTimeZone} />
      ) : null}
    </section>
  )
}

export function NextMeetupCallout() {
  return (
    <QueryClientRoot>
      <NextMeetupCalloutInner />
    </QueryClientRoot>
  )
}
