import { OverlayLayerSelection } from './OverlayLayerSelection'
import { OverlayLegendAndFocus } from './OverlayLegendAndFocus'

export const Overlay = () => {
  return (
    <nav className="absolute left-6 top-6 flex flex-col rounded-md bg-white shadow">
      <OverlayLayerSelection />
      <OverlayLegendAndFocus />
    </nav>
  )
}
