import { squads } from "@/constants/squads"
import Spinner from "@/components/Spinner"

export default async function Squad({ params }: { params: { squad: string } }) {
  const teams = squads.find(s => s.name === params?.squad)?.teams

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl font-bold m-2">Squad {params.squad}</h1>
      <Spinner teams={teams}/>
    </div>
  )
}
