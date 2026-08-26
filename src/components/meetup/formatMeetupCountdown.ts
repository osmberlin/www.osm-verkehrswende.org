import { TZDate } from '@date-fns/tz'
import type { Duration } from 'date-fns'
import {
  addDays,
  differenceInDays,
  format,
  formatDuration,
  intervalToDuration,
  isAfter,
} from 'date-fns'
import { de } from 'date-fns/locale'

/** e.g. "Dienstag, 22.09.2026 19:30" */
export function formatMeetupDateTime(startIso: string, timeZone: string): string {
  const start = new TZDate(startIso, timeZone)
  return format(start, 'EEEE, dd.MM.yyyy HH:mm', { locale: de })
}

type CountdownUnit = 'days' | 'hours' | 'minutes'

/**
 * Pick 1–2 units so the countdown gets more precise closer to the event.
 * date-fns has no flag for that: formatDistanceStrict is one unit,
 * formatDuration prints whatever units we pass in `format`.
 */
function countdownFormat(duration: Duration): CountdownUnit[] | null {
  const days = duration.days ?? 0
  const hours = duration.hours ?? 0
  const minutes = duration.minutes ?? 0

  if (days >= 2) return ['days']
  if (days >= 1) return ['days', 'hours']
  if (hours >= 1) return ['hours', 'minutes']
  if (minutes >= 1) return ['minutes']
  return null
}

function countdownDuration(now: Date, start: Date): Duration {
  const days = differenceInDays(start, now)
  const rest = intervalToDuration({ start: addDays(now, days), end: start })
  return {
    days,
    hours: rest.hours ?? 0,
    minutes: rest.minutes ?? 0,
  }
}

/**
 * Relative countdown: days → days+hours → hours+minutes → minutes.
 */
export function formatMeetupCountdown(
  startIso: string,
  endIso: string,
  now: Date = new Date(),
): string | null {
  const start = new Date(startIso)
  const end = new Date(endIso)

  if (!isAfter(end, now)) return null
  if (!isAfter(start, now)) return 'läuft gerade'

  const duration = countdownDuration(now, start)
  const units = countdownFormat(duration)
  if (!units) return 'gleich'

  const formatted = formatDuration(duration, {
    format: units,
    delimiter: ', ',
    locale: de,
  })

  // formatDuration uses standalone forms (“27 Tage”); dative after “in”.
  return `in ${formatted.replace(/\bTage\b/g, 'Tagen')}`
}
