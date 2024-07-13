import { $clickedMapData } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { MapInspectorPrimaryInformation } from './inspector/MapInspectorPrimaryInformation'
import { MapInspectorValueAsList } from './inspector/MapInspectorValueAsList'
import {
  listStyledKeys,
  skipInspectorKeys,
  translationTagValues,
  translationsKey,
} from './translations.const'

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
          <div key={`${feature.properties.id}/${feature.properties.side}`} className="mt-8">
            <h2 className="text-lg">{feature.properties.name || feature.properties.id}</h2>
            <MapInspectorPrimaryInformation properties={feature.properties} />

            <table className="w-full">
              <tbody>
                {Object.entries(feature.properties as Record<string, string | number>)
                  .filter(([key, _]) => !skipInspectorKeys.includes(key))
                  .map(([key, value]) => {
                    const multipleValues =
                      value &&
                      typeof value === 'string' &&
                      (value.includes(';') || Object.keys(listStyledKeys).includes(key))
                    const translationTag = `${key}=${value}`

                    return (
                      <tr key={key} className="border-b border-gray-800">
                        <th className="py-1 text-left leading-tight">
                          {translationsKey[key] || <code>{key}</code>}
                        </th>
                        <td className="w-full break-all py-1 pl-2 leading-tight">
                          {typeof value === 'number' ? (
                            <span>{value.toLocaleString()}</span>
                          ) : multipleValues ? (
                            <MapInspectorValueAsList
                              tagKey={key}
                              tagValue={value}
                              listStyle={listStyledKeys[key] || 'list'}
                            />
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
