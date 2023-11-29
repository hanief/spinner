import { exec } from "child_process"

export async function fetchCurrentBranch(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`cd ../${path}; git branch --show-current`, (error, stdout, stderr) => {
      if (error) {
          reject(error)
      }

      if (stderr) {
          reject(stderr)
      }
      
      resolve(stdout.replace(/\n|\r|\W/g, ""))
    })
  })
}