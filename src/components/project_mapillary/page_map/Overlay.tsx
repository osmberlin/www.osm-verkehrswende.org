import { OverlayFilter } from './OverlayFilter'
import { OverlayLegend } from './OverlayLegend'
import { OverlayStats } from './OverlayStats'

export const Overlay = () => {
  return (
    <nav className="absolute top-6 left-6 flex flex-col rounded-md bg-white shadow-sm">
      <OverlayLegend />
      <OverlayFilter />
      <OverlayStats />
    </nav>
  )
}
