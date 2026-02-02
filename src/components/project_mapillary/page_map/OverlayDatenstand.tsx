import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { twJoin } from 'tailwind-merge'
import { useMapillaryDate } from './useMapillaryDate'

export const OverlayDatenstand = () => {
  const mapillaryDateData = useMapillaryDate()

  return (
    <div className="border-t border-gray-200">
      <Disclosure as="div" className="max-w-60 leading-snug">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between">
              <DisclosureButton className="flex grow cursor-pointer gap-1 px-2 py-2 text-sm hover:font-medium">
                <ChevronRightIcon
                  className={twJoin(
                    'h-5 w-5 transition-transform',
                    open ? 'rotate-90 transform' : '',
                  )}
                />
                Datenstand: Bis {mapillaryDateData ? mapillaryDateData.displayDate : '...'}
              </DisclosureButton>
            </div>
            <DisclosurePanel className="px-2 pb-4 text-sm hyphens-auto text-gray-900">
              Diese Karte zeigt prozessierte Daten, die nur alle paar Wochen aktualisiert werden. Um
              zu bewerten, ob eine Straße immer noch frische Fotos benötigt, werden zusätzlich Daten
              direkt von Mapillary angezeigt. Die gestrichelten Linien zeigen Mapillary-Sequenzen,
              die nach dem {mapillaryDateData ? mapillaryDateData.displayDate : '...'} aufgenommen
              wurden.{' '}
              <a
                href="https://tilda-geo.de/docs/mapillary-coverage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Weitere Informationen
              </a>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
