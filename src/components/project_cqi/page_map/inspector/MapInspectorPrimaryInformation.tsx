import { $searchParams } from '@components/BaseMap/store'
import { useStore } from '@nanostores/react'
import { twJoin } from 'tailwind-merge'
import { legend1to100 } from '../layers/layers1to100'
import { legendLts } from '../layers/layersLts'
import type { SearchParamsCqiMap } from '../storeCqi'

type Props = {
  properties: GeoJSON.Feature['properties']
}

export const MapInspectorPrimaryInformation = ({ properties }: Props) => {
  const params = useStore($searchParams) as SearchParamsCqiMap

  if (!properties) {
    return null
  }

  if (params.anzeige === '1to100') {
    // Der index berechnet sich aus base_index (Basisindex entsprechend des Wegetyps) * fac_1 (Faktor für Breite und Oberfläche) * fac_2 (Faktor für Straßenklasse und Höchstgeschwindigkeit) * fac_3 (Faktor für Physische Trennung und Sicherheitsabstand, derzeit nicht implementiert und daher immer 1) * fac_4 (Sonstige auf- oder abwertende Umgebungsvariablen). Die einzelnen Faktoren wiederum basieren insbesondere auf den proc_*-Werten, also fac_1 z.B. auf proc_width und proc_surface. Da steckt aber viel Vodoo und Gewichtungen dahinter, daher ist mMn eigentlich höchstens die Anzeige der fac_1..4 sinnvoll.
    const color = legend1to100
      .find((group) => group.primary)
      ?.legends?.find((l) => l.key === `index_${properties.index_10}`)?.color

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
          const color = legendLts
            .find((group) => group.primary)
            ?.legends.find((l) => l.key === `stress_level_${displayLevel}`)?.color

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
