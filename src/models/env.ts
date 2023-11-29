import { readFile } from "fs/promises"
import dotenv from "dotenv"

export function useEnv() {

}

export async function fetchEnvContent(appId) {
  const filePath = `../container-env/.env.nodejs-dev-project-${appId}`

  const file = await readFile(filePath, { encoding: 'utf8' })

  const content = dotenv.parse(file)

  return content
}