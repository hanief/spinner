import { getServerSession } from "next-auth"
import { users } from "@/constants/apps"

export function useApps(email: string | null | undefined) {
  const apps = users.filter(user => user.email === email).flatMap(user => user.apps)
  
  return {
    apps: apps
  }
}