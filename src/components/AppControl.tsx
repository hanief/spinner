"use client"

import { Button } from "@/components/ui/button"
import EnvViewer from "./EnvViewer"
import BranchSelector from "./BranchSelector"
import { useState } from "react"
import { buildApp } from "@/actions/build"

export default function AppControl({ app, currentBranch, env }: { app: string, currentBranch: string, env: unknown}) {
  const [activeBranch, setActiveBranch] = useState(currentBranch)
  const [localEnv, setLocalEnv] = useState(env)
  const [isBuilding, setIsBuilding] = useState(false)

  function handleBuild() {
    setIsBuilding(true)
    buildApp(app, activeBranch, localEnv)

    // TODO: Fake building timer 1 minute. Fix to real one
    setTimeout(() => {
      setIsBuilding(false)
    }, 60 * 1000)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <BranchSelector activeBranch={activeBranch} setActiveBranch={setActiveBranch}/>
        <Button disabled={!activeBranch || isBuilding} onClick={handleBuild}>{isBuilding ? 'Building...' : 'Build'}</Button>
      </div>
      {/* <EnvViewer env={localEnv} setEnv={setLocalEnv}/> */}
    </>
  )
}