import { $clickedMapData } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import React from 'react'

export const MapInspector: React.FC = () => {
  const clickedMapData = useStore($clickedMapData)

  if (!clickedMapData || !clickedMapData.length) return null

  return (
    <section className="absolute inset-x-1 bottom-1 z-50 overflow-y-auto rounded-lg bg-blue-900 p-4 text-blue-50 shadow-xl sm:inset-x-auto sm:inset-y-2.5 sm:right-2.5 sm:w-96">
      <button
        onClick={() => $clickedMapData.set(undefined)}
        className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white p-1.5 text-blue-900 hover:bg-blue-50 hover:shadow-lg"
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
            <h2 className="text-lg">{feature.properties.strassenname}</h2>
            <table className="w-full font-mono">
              <tbody>
                {Object.entries(feature.properties)
                  // .filter((entry) => !['id'].includes(entry[0]))
                  .map(([key, value]) => {
                    return (
                      <tr key={key}>
                        <th className="text-left">{key}</th>
                        <td className="flex items-center justify-between">
                          <span>{typeof value === 'boolean' ? JSON.stringify(value) : value}</span>
                          {typeof value === 'string' && value.includes('way/') && (
                            <span className="prose prose-sm font-sans">
                              <a href={`https://osm.org/${value}`} target="_blank">
                                OSM
                              </a>
                            </span>
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
