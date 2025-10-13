/**
 * Formats a number as German locale with appropriate decimal places
 * @param value - The number to format
 * @returns Formatted string with German locale (comma as decimal separator, dot as thousands separator)
 */
export const formatKm = (value: number): string => {
  const precision = value < 100 ? 1 : 0
  const rounded = Number(value.toFixed(precision))

  return rounded.toLocaleString('de-DE', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })
}
