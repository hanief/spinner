import useSWR from 'swr'
import { getWinnersFromSquad } from '@/db/Database'

export function useWinners(squad: string) {
  const { data } = useSWR(`/winners/${squad}`, async () => {
    const winners = await getWinnersFromSquad(squad)

    return winners
  })

  return {
    winners: data
  }
}