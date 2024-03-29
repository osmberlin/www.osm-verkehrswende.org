import { OverlayLayerSelection } from './OverlayLayerSelection'
import { OverlayLegendAndFilter } from './OverlayLegendAndFilter'

export const Overlay = () => {
  return (
    <nav className="absolute left-6 top-6 flex flex-col rounded-md bg-white shadow">
      <OverlayLayerSelection />
      <OverlayLegendAndFilter />
    </nav>
  )
}
