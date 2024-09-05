export const authors = ['Tobias Jordans @tordans', 'Alex Seidel @supaplex030'] as const

export const authorsSelect = authors
  .map((authorName) => {
    return {
      label: authorName,
      value: authorName,
    }
  })
  .filter(Boolean)
