/**
 * sorts collections of user track or artists ids by most popular, combining the scores of common ids (the indexs are the inital score as they are in order of users most popular track/artist)
 * @param ids
 */
export function sortItemIds(ids: string[][]) {
  interface scoredIds {
    id: string
    score: number
  }
  interface countedId extends scoredIds {
    count: number
  }

  const formatedIds: scoredIds[][] = ids.map((ids) =>
    ids.map((id, index) => ({
      id,
      score: index + 1,
    })),
  )

  const sortedIds: countedId[][] = formatedIds
    .flat()
    .reduce((a, c) => {
      const existingId = a.find(({ id }) => id === c.id)
      if (existingId) {
        existingId.count++
        existingId.score = existingId.score + c.score
        return a
      }

      return [...a, { ...c, count: 1 }]
    }, [])
    .sort((a, b) => a.score / a.count - b.score / b.count)
  return sortedIds
}
