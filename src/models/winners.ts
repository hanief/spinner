import useSWR from 'swr'
import { getWinnersFromSquad, addWinnerFromSquad, deleteWinnerFromSquad, resetWinnersFromSquad } from '@/db/Database'
import { Winner } from '@/types'
import { DateTime } from 'luxon'

export function useWinners(squad: string) {
  const { data, mutate } = useSWR(`/winners/${squad}`, async () => {
    const winners = await getWinnersFromSquad(squad)
    
    return winners.sort((a, b) => a.date > b.date ? -1 : 1)
  })

  async function addWinner(winner: string, squad: string, forTomorrow = false) {
    const today = DateTime.now()
    let tomorrow = today
    if (tomorrow.weekday > 4) {
      tomorrow = tomorrow.plus({ days: 8 - tomorrow.weekday})
    }
    const date = forTomorrow ? tomorrow : today
    
    let newData: Winner[] = []

    if (data) {
      newData = data
    }

    newData = [...newData, { name: winner, date: date.toISO(), squad: squad }]

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

  async function resetWinners(squad: string) {
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