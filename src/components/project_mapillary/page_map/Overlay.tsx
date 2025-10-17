import { OverlayFilter } from './OverlayFilter'
import { OverlayLegend } from './OverlayLegend'
import { OverlayZoomMessage } from './OverlayZoomMessage'

export const Overlay = () => {
  return (
    <nav className="absolute top-6 left-6 flex flex-col overflow-clip rounded-md bg-white shadow-sm">
      <OverlayLegend />
      <OverlayFilter />
      <OverlayZoomMessage />
    </nav>
  )
}
