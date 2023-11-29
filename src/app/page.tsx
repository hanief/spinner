import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/config"
import LogoutButton from '@/components/ui/LogoutButton'
import AppItem from '@/components/AppItem'
import { users } from "@/constants/apps"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const apps = users.filter(user => user.email === session?.user?.email).flatMap(user => user.apps)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex mb-4">
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
      <div className="w-full">
        {apps?.map(app => <AppItem key={app} app={app}/>)}
      </div>
    </main>
  )
}
