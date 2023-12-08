import useSWR from 'swr'
import { getWinnersFromSquad, addWinnerFromSquad, deleteWinnerFromSquad } from '@/db/Database'
import { Winner } from '@/types'

export function useWinners(squad: string) {
  const { data, mutate } = useSWR(`/winners/${squad}`, async () => {
    const winners = await getWinnersFromSquad(squad)
    
    return winners.sort((a, b) => a.date > b.date ? -1 : 1)
  })

  async function addWinner(winner: string, squad: string) {
    const today = Date()
    
    let newData: Winner[] = []

    if (data) {
      newData = data
    }

    newData = [...newData, { name: winner, date: today, squad: squad }]

    return mutate(
      async () => {
        await addWinnerFromSquad(winner, squad)

        return newData
      },
      {
        optimisticData: newData
      }
    )
  }

  async function deleteWinner(winner: string, squad: string) {
    const newData = data?.filter(datum => datum.name !== winner)

    return mutate(
      async () => {
        await deleteWinnerFromSquad(winner, squad)

        return newData
      },
      {
        optimisticData: newData
      }
    )
  }

  return {
    winners: data,
    addWinner,
    deleteWinner
  }
}