export type TimeZoneOption = {
  value: string
  label: string
}

/** Curated zones for the meetup timezone dropdown. Browser zone is prepended at runtime. */
export const CURATED_TIME_ZONES: TimeZoneOption[] = [
  { value: 'Europe/Berlin', label: 'Europe/Berlin (MEZ/MESZ)' },
  { value: 'Europe/Vienna', label: 'Europe/Vienna' },
  { value: 'Europe/Zurich', label: 'Europe/Zurich' },
  { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam' },
  { value: 'Europe/London', label: 'Europe/London' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'America/New_York' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
]

export function getBrowserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Berlin'
  } catch {
    return 'Europe/Berlin'
  }
}

export function buildTimeZoneOptions(browserTimeZone: string): TimeZoneOption[] {
  const curatedValues = new Set(CURATED_TIME_ZONES.map((zone) => zone.value))
  const options: TimeZoneOption[] = []

  if (!curatedValues.has(browserTimeZone)) {
    options.push({
      value: browserTimeZone,
      label: `${browserTimeZone} (lokal)`,
    })
  }

  for (const zone of CURATED_TIME_ZONES) {
    options.push({
      ...zone,
      label:
        zone.value === browserTimeZone && !zone.label.includes('lokal')
          ? `${zone.label} · lokal`
          : zone.label,
    })
  }

  return options
}

const TIMEZONE_STORAGE_KEY = 'osm-vw-meetup-timezone'

export function readStoredTimeZone(): string | null {
  try {
    const value = localStorage.getItem(TIMEZONE_STORAGE_KEY)
    return value && value.length > 0 ? value : null
  } catch {
    return null
  }
}

export function writeStoredTimeZone(timeZone: string): void {
  try {
    localStorage.setItem(TIMEZONE_STORAGE_KEY, timeZone)
  } catch {
    // Ignore quota / private mode failures.
  }
}
