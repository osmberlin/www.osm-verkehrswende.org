export const maprouletteChallengeUrl = (id: string | number | null) => {
  if (!id) return null
  // `https://maproulette.org/challenge/${id}` would open a random task
  return `https://maproulette.org/browse/challenge/${id}`
}