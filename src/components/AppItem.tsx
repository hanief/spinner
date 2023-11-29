import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import EnvView from "./EnvView"
import BranchSelector from "./BranchSelector"
import { fetchEnvContent } from '@/models/env'
import { fetchCurrentBranch } from '@/models/git'

export default async function AppItem({ app }: { app: number }) {
  const env = await fetchEnvContent(app)
  const currentBranch = await fetchCurrentBranch(`jakpat-dash-react-${app}`)

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
          <BranchSelector currentBranch={currentBranch}/>
          <Button>Build</Button>
        </div>
        <EnvView env={env}/>
      </CardContent>
    </Card>
  )
}