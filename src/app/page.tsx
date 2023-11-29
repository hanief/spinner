import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/config"
import LogoutButton from '@/components/ui/LogoutButton'
import AppItem from '@/components/AppItem'
import { fetchEnvContent } from '@/models/env'
import { users } from "@/constants/apps"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email
  const isJakpatEmail = userEmail?.split('@')[1] === 'jakpat.net'
  const apps = users.filter(user => user.email === userEmail).flatMap(user => user.apps)
  const env = await fetchEnvContent(apps[0])
  
  function renderNotJakpat() {
    return (
      <div>
        <p>{userEmail}</p>
        <p>Sorry, this is internal Jakpat tool. Please sign in using your Jakpat email.</p>
      </div>
    )
  }

  function renderIsJakpat() {
    return (
      <div className="w-full">
        {apps?.map(app => {
          return (
            <AppItem key={app} app={app} env={env}/>
          )
        })}
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <Image
          src="/jakpat-blue.png"
          alt="Jakpat Logo"
          width={100}
          height={24}
          priority
        />
        <p className='font-bold sm:hidden md:block'>Dash Dev Deployer</p>   
        <LogoutButton />
      </div>
      {isJakpatEmail ? 
        renderIsJakpat() : 
        renderNotJakpat()
      }
    </main>
  )
}
