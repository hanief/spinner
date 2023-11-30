import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "./ui/button"

export default async function SquadItem({ squad }: { squad?: string }) {
  return (
    <Card className="my-1 w-[50vh]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Squad {squad}
          <Link href={`/${squad}`}><Button>Go to squad</Button></Link>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}