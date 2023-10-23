export const OverlayLegend = () => {
  return (
    <ul className="px-2 py-4 text-sm font-normal leading-4 text-gray-900 space-y-2">
      <li className="flex gap-2 items-top">
        <div className="rounded-full mt-1 w-7 h-2" style={{ backgroundColor: '#1e40af' }} />
        <span>
          Straßensegmente mit <br />
          ausreichend Fotos
        </span>
      </li>
      <li className="flex gap-2 items-top">
        <div className="rounded-full mt-1 w-7 h-2" style={{ backgroundColor: '#db2777' }} />
        <span>Hier fehlen Fotos</span>
      </li>
    </ul>
  )
}
