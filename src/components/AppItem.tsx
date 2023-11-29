"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import EnvDialog from "./EnvView"
import { useState } from "react"
import { useRepos } from "@/models/repos"

export default function AppItem({ app, env }: { app: number, env: any }) {
  const [activeBranch, setActiveBranch] = useState('')
  const { branches, isLoading } = useRepos()

  return (
    <Card className="my-1 w-full">
      <CardHeader>
        <CardTitle>App {app}</CardTitle>
        <CardDescription>
          <Link href={`https://dash-dev-${app}.jakpat.web.id`} target="_blank">{`https://dash-dev-${app}.jakpat.web.id`}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Select value={activeBranch} onValueChange={value => setActiveBranch(value)}>
            <SelectTrigger className="w-[50%]">
              <SelectValue placeholder={isLoading && branches?.length === 0 ? "Getting branches..." : "Select branch"} />
            </SelectTrigger>
            <SelectContent>
              {branches?.map(branch => {
                return <SelectItem key={branch?.name} value={branch?.name}>{branch?.name}</SelectItem>
              })}
            </SelectContent>
          </Select>
          <Button>Build</Button>
        </div>
        <EnvDialog env={env}/>
      </CardContent>
    </Card>
  )
}