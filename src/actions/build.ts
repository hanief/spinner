"use server"

import fs from "fs"
import { exec } from "child_process"

function getStringFromEnvObject(env: any) {
  let envString = ''

  Object.keys(env).forEach(key => {
    envString += `${key}=${env[key]}\n`
  })

  return envString
}

export async function buildApp(appId: string, branch: string, env: any) {
  const pipePath = "/vuexy/pipe"
  const outputPath = "/vuexy/output"
  const envString = getStringFromEnvObject(env)
  const commandToRun = `./rebuild.sh ${appId} ${branch}`


  const wstream = fs.createWriteStream(pipePath)
  wstream.write(commandToRun)
  wstream.close()
}