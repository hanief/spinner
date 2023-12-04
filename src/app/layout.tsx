import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import LogoutButton from '@/components/ui/LogoutButton'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Squad Spinner',
  description: 'Squad Spinner',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col items-center justify-between p-10">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex mb-4">
            <Link href="/">
              <Image
                src="/jakpat-blue.png"
                alt="Jakpat Logo"
                width={100}
                height={20}
                priority
              />
            </Link>
            <LogoutButton />
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
