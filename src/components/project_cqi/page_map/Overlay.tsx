import { OverlayLayerSelection } from './OverlayLayerSelection'
import { OverlayLegendAndFilter } from './OverlayLegendAndFilter'

export const Overlay = () => {
  return (
    <nav className="absolute top-6 left-6 flex flex-col rounded-md bg-white shadow-sm">
      <OverlayLayerSelection />
      <OverlayLegendAndFilter />
    </nav>
  )
}
