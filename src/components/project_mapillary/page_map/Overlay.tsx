import { OverlayDatenstand } from './OverlayDatenstand'
import { OverlayFilter } from './OverlayFilter'
import { OverlayFortbewegungsfilter } from './OverlayFortbewegungsfilter'
import { OverlayLegend } from './OverlayLegend'
import { OverlayRoutePlanning } from './OverlayRoutePlanning'
import { OverlayZoomMessage } from './OverlayZoomMessage'

export const Overlay = () => {
  return (
    <nav className="absolute top-6 left-6 flex flex-col overflow-clip rounded-md bg-white shadow-sm">
      <OverlayLegend />
      <OverlayDatenstand />
      <OverlayFortbewegungsfilter />
      <OverlayFilter />
      <OverlayRoutePlanning />
      <OverlayZoomMessage />
    </nav>
  )
}
