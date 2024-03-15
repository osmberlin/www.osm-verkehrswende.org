import { translationTagValues } from '../translations.const'

export type ListStyleType = 'plus' | 'minus' | 'questionmark' | 'list'
type Props = {
  tagKey: string
  tagValue: string
  listStyle: ListStyleType
}

export const MapInspectorValueAsList = ({ tagKey, tagValue, listStyle }: Props) => {
  const values = tagValue.split(';')

  return (
    <ul className={listStyle === 'list' ? 'ml-3 list-disc' : 'space-y-1'}>
      {values.map((singleValue) => {
        const translationTag = `${tagKey}=${singleValue}`
        return (
          <li
            key={translationTag}
            className={listStyle !== 'list' ? 'flex items-center gap-1' : ''}
          >
            {listStyle === 'plus' && (
              <span className="flex size-4 items-center justify-center rounded-full bg-gray-700 font-mono font-bold">
                +
              </span>
            )}
            {listStyle === 'minus' && (
              <span className="flex size-4 items-center justify-center rounded-full bg-gray-700 font-mono font-bold">
                -
              </span>
            )}
            {listStyle === 'questionmark' && (
              <span className="flex size-4 items-center justify-center rounded-full bg-gray-700 font-mono text-xs">
                ?
              </span>
            )}
            {translationTagValues[translationTag] ? (
              <span data-key={translationTag}>{translationTagValues[translationTag]}</span>
            ) : (
              <code data-key={translationTag}>
                <span>
                  {typeof singleValue === 'boolean' ? JSON.stringify(singleValue) : singleValue}
                </span>
              </code>
            )}
          </li>
        )
      })}
    </ul>
  )
}
