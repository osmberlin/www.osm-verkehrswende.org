import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

type TimeZoneOption = {
  value: string
  label: string
}

/** Meetup is in Berlin; extra zones for visitors. Zurich/Vienna share Berlin’s offset. */
const EXTRA_TIME_ZONES: TimeZoneOption[] = [
  { value: 'Europe/Berlin', label: 'Europe/Berlin (MEZ/MESZ)' },
  { value: 'Europe/Warsaw', label: 'Europe/Warsaw' },
  { value: 'Europe/London', label: 'Europe/London' },
  { value: 'America/New_York', label: 'America/New_York' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
  { value: 'UTC', label: 'UTC' },
]

export function getBrowserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Berlin'
  } catch {
    return 'Europe/Berlin'
  }
}

function buildTimeZoneOptions(browserTimeZone: string): TimeZoneOption[] {
  const extras = EXTRA_TIME_ZONES.filter((zone) => zone.value !== browserTimeZone)
  const options: TimeZoneOption[] = [
    { value: browserTimeZone, label: `${browserTimeZone} (lokal)` },
    ...extras,
  ]

  return options
}

type Props = {
  timeZone: string
  onChange: (timeZone: string) => void
}

export function TimeZonePicker({ timeZone, onChange }: Props) {
  const options = buildTimeZoneOptions(getBrowserTimeZone())

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
          <ul className="max-h-64 overflow-auto py-1 text-sm">
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
