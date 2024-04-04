import { $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { legendCqi } from '../layers/layersCqi'
import { legendLts } from '../layers/layersLts'
import type { CqiMapSearchparams } from '../storeCqi'
import { MapInspectorValueAsList } from './MapInspectorValueAsList'

type Props = {
  properties: GeoJSON.Feature['properties']
}

export const MapInspectorPrimaryInformation = ({ properties }: Props) => {
  const params = useStore($searchParams) as CqiMapSearchparams

  if (!properties) {
    return null
  }

  if (params.anzeige === 'cqi') {
    // Der index berechnet sich aus base_index (Basisindex entsprechend des Wegetyps) * fac_1 (Faktor für Breite und Oberfläche) * fac_2 (Faktor für Straßenklasse und Höchstgeschwindigkeit) * fac_3 (Faktor für Physische Trennung und Sicherheitsabstand, derzeit nicht implementiert und daher immer 1) * fac_4 (Sonstige auf- oder abwertende Umgebungsvariablen). Die einzelnen Faktoren wiederum basieren insbesondere auf den proc_*-Werten, also fac_1 z.B. auf proc_width und proc_surface. Da steckt aber viel Vodoo und Gewichtungen dahinter, daher ist mMn eigentlich höchstens die Anzeige der fac_1..4 sinnvoll.
    const color = legendCqi
      .find((group) => group.primary)
      ?.legends?.find((l) => l.key === `l${properties.index_10}`)?.color

    return (
      <div
        className="my-2 flex items-center justify-center gap-1 rounded py-2 text-gray-950"
        style={{ backgroundColor: color }}
      >
        {properties.index != 1 && <>1…</>}
        <span className="text-2xl font-bold leading-tight">{String(properties.index)}</span>
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
          const color = legendLts
            .find((group) => group.primary)
            ?.legends.find((l) => l.key === `l${displayLevel}`)?.color

          return (
            <div
              key={displayLevel}
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
      <div className="my-1 flex rounded bg-gray-950 p-2 text-base">
        {!properties.data_missing && <>Keine</>}
        {properties.data_missing && (
          <MapInspectorValueAsList
            tagKey={'data_missing'}
            tagValue={properties.data_missing}
            listStyle="questionmark"
          />
        )}
      </div>
    )
  }

  return null
}
