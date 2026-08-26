import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { formatMeetupDateTime } from './formatMeetupCountdown'

const BERLIN_TIME_ZONE = 'Europe/Berlin'

export function getBrowserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || BERLIN_TIME_ZONE
  } catch {
    return BERLIN_TIME_ZONE
  }
}

function clocksDiffer(startIso: string, a: string, b: string): boolean {
  return formatMeetupDateTime(startIso, a) !== formatMeetupDateTime(startIso, b)
}

type Props = {
  startIso: string
  timeZone: string
  onChange: (timeZone: string) => void
}

/** Browser zone plus Berlin when that actually changes the shown clock. No curated list. */
export function TimeZonePicker({ startIso, timeZone, onChange }: Props) {
  const browserTimeZone = getBrowserTimeZone()
  const showBerlin = clocksDiffer(startIso, browserTimeZone, BERLIN_TIME_ZONE)

  if (!showBerlin) return null

  const options = [
    { value: browserTimeZone, label: `${browserTimeZone} (lokal)` },
    { value: BERLIN_TIME_ZONE, label: 'Europe/Berlin (MEZ/MESZ)' },
  ]

  return (
    <Popover className="relative shrink-0">
      <PopoverButton
        className="flex size-8 items-center justify-center rounded-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        aria-label={`Zeitzone: ${timeZone}`}
        title={`Zeitzone: ${timeZone}`}
      >
        <GlobeAltIcon className="size-5" aria-hidden />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="z-50 mt-1 w-72 rounded-sm border border-gray-200 bg-white p-1 shadow-md"
      >
        {({ close }) => (
          <ul className="py-1 text-sm">
            {options.map((option) => {
              const selected = option.value === timeZone
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    className={
                      selected
                        ? 'w-full bg-emerald-50 px-3 py-2 text-left font-medium text-gray-900'
                        : 'w-full px-3 py-2 text-left text-gray-800 hover:bg-gray-100'
                    }
                    onClick={() => {
                      onChange(option.value)
                      close()
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </PopoverPanel>
    </Popover>
  )
}
