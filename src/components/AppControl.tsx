"use client"

import { Button } from "@/components/ui/button"
import EnvViewer from "./EnvViewer"
import BranchSelector from "./BranchSelector"
import { useState } from "react"
import { buildApp } from "@/actions/build"

export default function AppControl({ app, currentBranch, env }: { app: string, currentBranch: string, env: unknown}) {
  const [activeBranch, setActiveBranch] = useState(currentBranch)
  const [localEnv, setLocalEnv] = useState(env)

  return (
    <>
      <div className="flex items-center justify-between">
        <BranchSelector activeBranch={activeBranch} setActiveBranch={setActiveBranch}/>
        <Button onClick={() => buildApp(app, activeBranch, localEnv)}>Build</Button>
      </div>
      <EnvViewer env={localEnv} setEnv={setLocalEnv}/>
    </>
  )
}