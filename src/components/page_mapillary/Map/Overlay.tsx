import { OverlayFilter } from './OverlayFilter'
import { OverlayLegend } from './OverlayLegend'
import { OverlayStats } from './OverlayStats'

export const Overlay = () => {
  return (
    <nav className="absolute left-6 top-6 flex flex-col shadow bg-white rounded-md">
      <OverlayLegend />
      <OverlayFilter />
      <OverlayStats />
    </nav>
  )
}
