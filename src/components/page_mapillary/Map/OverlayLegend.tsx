export const OverlayLegend = () => {
  return (
    <ul className="space-y-2 px-2 py-4 text-sm font-normal leading-4 text-gray-900">
      <li className="items-top flex gap-2">
        <div className="mt-1 h-2 w-7 rounded-full" style={{ backgroundColor: '#1e40af' }} />
        <span>
          Straßensegmente mit <br />
          ausreichend Fotos
        </span>
      </li>
      <li className="items-top flex gap-2">
        <div className="mt-1 h-2 w-7 rounded-full" style={{ backgroundColor: '#db2777' }} />
        <span>Hier fehlen Fotos</span>
      </li>
    </ul>
  )
}
