import { $clickedMapData, $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { legendLts } from './layers/layersLts'
import type { SearchParamsCqiMap } from './storeCqi'
import { skipInspectorKeys, translationTagValues, translationsKey } from './translations.const'
import { legend1to100 } from './layers/layers1to100'

function MapInspectorPrimaryIndex({ properties }: { properties: GeoJSON.Feature['properties'] }) {
  const params = useStore($searchParams) as SearchParamsCqiMap
  if (!properties) {
    return null
  }
  if (params.anzeige === '1to100') {
    // Der index berechnet sich aus base_index (Basisindex entsprechend des Wegetyps) * fac_1 (Faktor für Breite und Oberfläche) * fac_2 (Faktor für Straßenklasse und Höchstgeschwindigkeit) * fac_3 (Faktor für Physische Trennung und Sicherheitsabstand, derzeit nicht implementiert und daher immer 1) * fac_4 (Sonstige auf- oder abwertende Umgebungsvariablen). Die einzelnen Faktoren wiederum basieren insbesondere auf den proc_*-Werten, also fac_1 z.B. auf proc_width und proc_surface. Da steckt aber viel Vodoo und Gewichtungen dahinter, daher ist mMn eigentlich höchstens die Anzeige der fac_1..4 sinnvoll.
    const color = legend1to100.find((l) => l.key === `index_${properties.index_10}`)?.color
    return (
      <div className="my-2 flex items-center justify-center gap-1">
        {properties.index != 1 && <>1…</>}
        <span
          className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-gray-500 text-xl font-bold leading-tight text-gray-950"
          style={{ backgroundColor: color }}
        >
          {String(properties.index)}
        </span>
        {properties.index != 100 && <>…100</>}
      </div>
    )
  }
  if (params.anzeige === 'lts') {
    const displayLevels = [1, 2, 3, 4]
    return (
      <div className="my-2 flex justify-center gap-1">
        {displayLevels.map((displayLevel) => {
          const current = properties.stress_level === displayLevel
          const color = legendLts.find((l) => l.key === `stress_level_${displayLevel}`)?.color
          return (
            <div
              className={twJoin(
                'flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 leading-tight',
                current
                  ? 'bg-gray-500 text-2xl font-bold text-gray-950'
                  : 'bg-gray-900 text-xl text-gray-200',
              )}
              style={{
                backgroundColor: current ? color : undefined,
                borderColor: color,
              }}
            >
              {String(displayLevel)}
            </div>
          )
        })}
      </div>
    )
  }
  if (params.anzeige === 'incompleteness') {
    return (
      <div className="flex justify-center bg-white/20 p-2 text-xl">
        {!properties.data_missing && <>Keine</>}
        {properties.data_missing && <>{properties.data_missing}</>}
      </div>
    )
  }
  return null
}

export const MapInspector = () => {
  const clickedMapData = useStore($clickedMapData)

  if (!clickedMapData || !clickedMapData.length) return null

  return (
    <section className="absolute inset-x-1 bottom-1 z-50 overflow-y-auto rounded-lg bg-gray-900 p-4 text-gray-50 shadow-xl sm:inset-x-auto sm:inset-y-2.5 sm:right-2.5 sm:w-96">
      <button
        onClick={() => $clickedMapData.set(undefined)}
        className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white p-1.5 text-gray-900 hover:bg-gray-50 hover:shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>

        <span className="sr-only">Details ausblenden</span>
      </button>

      {clickedMapData.map((feature) => {
        return (
          <div key={feature.properties.id} className="mt-8">
            <h2 className="text-lg">{feature.properties.name || feature.properties.id}</h2>
            <MapInspectorPrimaryIndex properties={feature.properties} />

            <table className="w-full">
              <tbody>
                {Object.entries(feature.properties as Record<string, string | number>)
                  .filter(([key, _]) => !skipInspectorKeys.includes(key))
                  .map(([key, value]) => {
                    const multipleValues = typeof value === 'string' && value.includes(';')
                    let translationTag = `${key}=${value}`
                    return (
                      <tr key={key} className="border-b border-gray-800">
                        <th className="py-1 text-left leading-tight">
                          {translationsKey[key] || <code>{key}</code>}
                        </th>
                        <td className="w-full break-all py-1 pl-2 leading-tight">
                          {typeof value === 'number' ? (
                            <span>{value.toLocaleString()}</span>
                          ) : multipleValues ? (
                            <ul className="ml-3 list-disc">
                              {value.split(';').map((singleValue) => {
                                translationTag = `${key}=${singleValue}`
                                return (
                                  <li key={translationTag}>
                                    {translationTagValues[translationTag] ? (
                                      <span data-key={translationTag}>
                                        {translationTagValues[translationTag]}
                                      </span>
                                    ) : (
                                      <code>
                                        <span>
                                          {typeof singleValue === 'boolean'
                                            ? JSON.stringify(singleValue)
                                            : singleValue}
                                        </span>
                                      </code>
                                    )}
                                  </li>
                                )
                              })}
                            </ul>
                          ) : translationTagValues[translationTag] ? (
                            <span data-key={translationTag}>
                              {translationTagValues[translationTag]}
                            </span>
                          ) : (
                            <div className="flex w-full items-center justify-between">
                              <code>
                                {typeof value === 'boolean' ? JSON.stringify(value) : value}
                              </code>
                              {typeof value === 'string' && value.includes('way/') && (
                                <a
                                  href={`https://osm.org/${value}`}
                                  target="_blank"
                                  className="underline hover:decoration-2"
                                >
                                  OSM
                                </a>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        )
      })}
    </section>
  )
}
