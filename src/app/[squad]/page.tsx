import { getTeamsFromSquad, getWinnersFromSquad } from "@/db/Database"
import Spinner from "@/components/Spinner"
import WinnerTable from "@/components/WinnerTable"
import { getServerSession } from "next-auth"
import { authOptions } from "@/config"

export default async function Squad({ params }: { params: { squad: string } }) {
  const session = await getServerSession(authOptions)
  const teams = await getTeamsFromSquad(params?.squad)

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl font-bold m-2">Squad {params.squad}</h1>
      <Spinner teams={teams} squad={params?.squad}/>
      <WinnerTable user={session?.user}/>
    </div>
  )
}
