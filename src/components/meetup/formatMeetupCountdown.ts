import { TZDate } from '@date-fns/tz'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  intervalToDuration,
} from 'date-fns'
import { de } from 'date-fns/locale'

function pluralDe(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`
}

/** e.g. "Dienstag, 22.09.2026 19:30" */
export function formatMeetupDateTime(startIso: string, timeZone: string): string {
  const start = new TZDate(startIso, timeZone)
  return format(start, 'EEEE, dd.MM.yyyy HH:mm', { locale: de })
}

/**
 * Relative countdown that gets more precise closer to the event:
 * days → days+hours → hours+minutes → minutes.
 * Returns a live label while the meetup is ongoing.
 */
export function formatMeetupCountdown(
  startIso: string,
  endIso: string,
  now: Date = new Date(),
): string | null {
  const start = new Date(startIso)
  const end = new Date(endIso)

  if (!(end.getTime() > now.getTime())) return null

  if (!(start.getTime() > now.getTime())) {
    return 'läuft gerade'
  }

  const totalMinutes = differenceInMinutes(start, now)
  const totalHours = differenceInHours(start, now)
  const totalDays = differenceInDays(start, now)

  if (totalDays >= 2) {
    return `in ${pluralDe(totalDays, 'Tag', 'Tagen')}`
  }

  if (totalHours >= 24) {
    const duration = intervalToDuration({ start: now, end: start })
    const days = duration.days ?? totalDays
    const hours = duration.hours ?? 0
    if (hours === 0) {
      return `in ${pluralDe(days, 'Tag', 'Tagen')}`
    }
    return `in ${pluralDe(days, 'Tag', 'Tagen')}, ${pluralDe(hours, 'Stunde', 'Stunden')}`
  }

  if (totalHours >= 1) {
    const duration = intervalToDuration({ start: now, end: start })
    const hours = duration.hours ?? totalHours
    const minutes = duration.minutes ?? 0
    if (minutes === 0) {
      return `in ${pluralDe(hours, 'Stunde', 'Stunden')}`
    }
    return `in ${pluralDe(hours, 'Stunde', 'Stunden')}, ${pluralDe(minutes, 'Minute', 'Minuten')}`
  }

  if (totalMinutes >= 1) {
    return `in ${pluralDe(totalMinutes, 'Minute', 'Minuten')}`
  }

  return 'gleich'
}
