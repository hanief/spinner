import SquadItem from "@/components/SquadItem"
import { squads } from "@/constants/squads"

export default async function Home() {
  return (
    <div className="w-[50vh] flex flex-col items-center">
      {squads.map(squad => <SquadItem key={squad.name} squad={squad.name} />)}
    </div>
  )
}
