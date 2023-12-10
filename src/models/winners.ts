import useSWR from 'swr'
import { getWinnersFromSquad, addWinnerFromSquad, deleteWinnerFromSquad, resetWinnersFromSquad } from '@/db/Database'
import { Winner } from '@/types'
import { DateTime } from 'luxon'

export function useWinners(squad: string) {
  const { data, mutate } = useSWR(`/winners/${squad}`, async () => {
    const winners = await getWinnersFromSquad(squad)
    
    return winners.sort((a, b) => a.date > b.date ? -1 : 1)
  })

  async function addWinner(winner: string, date?: DateTime) {
    let dateString = date?.toISO()
    if (!dateString) {
      dateString = DateTime.now().toISO()
    }
    
    let newData: Winner[] = []

    if (data) {
      newData = data
    }

    newData = [...newData, { name: winner, date: dateString, squad: squad }]

    return mutate(
      async () => {
        await addWinnerFromSquad(winner, squad, dateString)

        return newData
      },
      {
        optimisticData: newData
      }
    )
  }

  async function deleteWinner(winner: string) {
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

  async function resetWinners() {
    const newData: Winner[] = []

    return mutate(
      async () => {
        await resetWinnersFromSquad(squad)

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
    deleteWinner,
    resetWinners
  }
}