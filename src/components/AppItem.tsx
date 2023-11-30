import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { fetchEnvContent } from '@/models/env'
import { fetchCurrentBranch } from '@/models/git'
import AppControl from "./AppControl"

export default async function AppItem({ app }: { app: string }) {
  const env = await fetchEnvContent(app)
  // const currentBranch = await fetchCurrentBranch(`jakpat-dash-react-${app}`)

  return (
    <Card className="my-1 w-full">
      <CardHeader>
        <CardTitle>App {app}</CardTitle>
        <CardDescription>
          <Link href={`https://dash-dev-${app}.jakpat.web.id`} target="_blank">{`https://dash-dev-${app}.jakpat.web.id`}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AppControl app={app} currentBranch={''} env={env}/>
      </CardContent>
    </Card>
  )
}