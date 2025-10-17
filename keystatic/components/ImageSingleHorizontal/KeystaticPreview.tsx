import type { ImagePreviewType } from '../utils/imagePreviewTypes.ts'
import { Uint8Array } from '../utils/Unit8Image.tsx'

export const KeystaticPreview = (props: ImagePreviewType) => {
  if (props.value.src)
    return (
      <div>
        <small style={{ color: 'gray' }}>
          *Positionierung und Seitenverhältnis sind in der Vorschau nicht korrekt dargestellt
        </small>
        <figure>
          <div style={{ height: '200px', width: '300PX' }}>
            <Uint8Array data={props.value.src?.data} />
          </div>
          <figcaption>{props.value.caption}</figcaption>
        </figure>
      </div>
    )
  return <p>Füge ein Bild hinzu über "Edit"</p>
}
