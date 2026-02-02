import { $searchParams, baseMapSearchparamsParse } from '@components/BaseMap/store'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { buildRoutePlanningUrl } from './routePlanningUrl'
import type { SearchParamsMapillaryMap } from './storeMapillary'

const ROUTING_BASE_URL = 'https://vizsim.github.io/missing_mapillary_gh-routing/'
const ROUTING_GITHUB_URL = 'https://github.com/vizsim/missing_mapillary_gh-routing'

export const OverlayRoutePlanning = () => {
  const params = useStore($searchParams) as SearchParamsMapillaryMap
  const mapParams = baseMapSearchparamsParse(params.map)

  const zoom = mapParams.zoom ?? 12
  const lat = mapParams.latitude ?? 52.5
  const lng = mapParams.longitude ?? 13.4

  const url = buildRoutePlanningUrl({
    zoom,
    lat,
    lng,
    startLat: lat,
    startLng: lng,
    addDefaultEnd: true,
  })

  return (
    <div className="border-t border-gray-200">
      <Disclosure as="div" className="max-w-60 leading-snug">
        {({ open }) => (
          <>
            <div className="flex items-center gap-2 px-2 py-3">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-blue-700"
              >
                Routenplanung
              </a>
              <DisclosureButton
                className={twJoin(
                  'rounded border p-1 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  open && 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
                )}
                aria-label="Informationen zur Routenplanung"
              >
                <InformationCircleIcon className="size-5" />
              </DisclosureButton>
            </div>
            <DisclosurePanel className="px-2 pb-4 text-sm hyphens-auto text-gray-700">
              <p className="leading-snug">
                Das Routing ermöglicht eine Strecke zu finden, auf der man möglichst viele Straßen
                „mitnimmt“, auf denen Fotos fehlen. Es wird von Community-Mitglied vizsim
                bereitgestellt (
                <a
                  href={ROUTING_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  GitHub
                </a>
                ). Die Daten werden circa einmal pro Woche aktualisiert. Sie basieren auf den
                gleichen Ausgangsdaten, die auch für die Darstellung der fehlenden Wege hier in der
                Karte verwendet werden, sind aber voneinander unabhängig.
              </p>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
