"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { isAdmin } from "@/lib/utils"
import { Button } from "./ui/button"
import { User } from "@/types"
import { useWinners } from "@/models/winners"
import { days } from "@/constants/days"

export default function WinnerTable({ user, squad }: { user?: User, squad: string }) {
  const { winners, deleteWinner } = useWinners(squad)
  const isUserAdmin = isAdmin(user?.email)

  return (
    <Table className="border mt-6 w-[50vh] mx-auto">
      <TableHeader>
        <TableRow className="border">
          <TableHead>Yang beruntung</TableHead>
          <TableHead>Giliran hari</TableHead>
          {isUserAdmin && <TableHead>Aksi</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {winners?.map(winner => {
          const date = new Date(winner.date)
          const dayOfTheWeek = date.getDay()
          const hari = days[dayOfTheWeek]

          return (
            <TableRow key={winner.date}>
              <TableCell>{winner.name}</TableCell>
              <TableCell>{hari}</TableCell>
              {isUserAdmin && 
                <TableCell>
                  <Button variant="destructive" onClick={() => deleteWinner(winner.name, winner.squad)}>Delete</Button>
                </TableCell>
              }
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}