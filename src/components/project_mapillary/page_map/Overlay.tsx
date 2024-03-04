import { OverlayFilter } from './OverlayFilter'
import { OverlayLegend } from './OverlayLegend'
import { OverlayStats } from './OverlayStats'

export const Overlay = () => {
  return (
    <nav className="absolute left-6 top-6 flex flex-col rounded-md bg-white shadow">
      <OverlayLegend />
      <OverlayFilter />
      <OverlayStats />
    </nav>
  )
}
