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
import { Winner } from "@/types"
import { isAdmin } from "@/lib/utils"
import { Button } from "./ui/button"
import { deleteWinner } from "@/db/Database"
import { User } from "@/types"
import { useRouter } from "next/router"
import { useWinners } from "@/models/winners"

const weeks = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Senin',
  'Senin'
]

export default function WinnerTable({ user }: { user?: User }) {
  const router = useRouter()
  const { winners } = useWinners(router.query?.squad as string)
  const isUserAdmin = isAdmin(user?.email)

  return (
    <Table className="border mt-3 w-[50vh] mx-auto">
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
          const hari = weeks[dayOfTheWeek]

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