'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useSession } from '@/hooks/useSession'
import { cn } from '@/lib/utils'
import { useRouter } from '@bprogress/next'
import { NotebookTabs, UserPen } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import UserProfileHeader, { UserProfileHeaderSkeleton } from './_components/UserProfileHeader'
import { useRevealer } from '@/hooks/useRevealer'


const navListButton = [
  {
    content: "Edit Profile",
    logo: <UserPen/>,
    url: "/profile/edit"
  },
  {
    content: "Reservations",
    logo: <NotebookTabs/>,
    url: "/profile/reservations"
  },
]

export default function ProfileLayout({ children }: { children: ReactNode }) {
  useRevealer()
  const { user } = useSession()
  const router = useRouter()
  const isMobile = useIsMobile()
  const pathname = usePathname()

  return (
    <>
      <div className="revealer"></div>
      <section className='w-full max-w-[1620px] min-h-screen mx-auto flex flex-col gap-10 sm:gap-20 p-6 lg:p-12 pt-24 lg:pt-32'>
        <header className='w-full max-w-3xl flex gap-5 flex-col sm:flex-row md:justify-between mx-auto'>
          {/* USER PROFILE */}
          {user ? (
            <UserProfileHeader user={user}/>
          ) : (
            <UserProfileHeaderSkeleton/>
          )}

          {/* SIMPLE STATS */}
          <div className='p-5 flex flex-col gap-1 bg-white/50 dark:bg-white/10 rounded-md'>
            <h3 className='text-2xl font-bold text-left'>Login as</h3>
            {user ? (
              <p className='text-left mb-2'>{user.role}</p>
            ) : (
              <Skeleton className='w-44 h-7 mb-2'/>
            )}
            
            <hr className='mt-auto bg-card-foreground'/>
            <button
              className='opacity-50 text-center hover:opacity-100 hover:cursor-pointer'
              onClick={() => router.push("/profile/reservations")}
              >
              See more reservations
            </button>
          </div>
        </header>

        <main className='w-full'>
          <nav className='h-15 w-full border-y border-primary-foreground/30 py-2 flex gap-10 md:gap-3 justify-center'>
            {navListButton.map(navButton => (
              <button
                className={
                  cn(
                    `text-xl flex items-center gap-2 px-3 rounded-md hover:bg-primary-foreground/10`,
                    pathname.startsWith(navButton.url) ? "text-primary bg-primary-foreground pointer-events-none" : "cursor-pointer pointer-events-auto"
                  )
                }
                key={navButton.content}
                onClick={() => router.push(navButton.url, { showProgress: true })}
                >
                  {navButton.logo}
                  {!isMobile && navButton.content}
              </button>
            ))}
          </nav>
          {children}
        </main>

        <footer className='mt-auto w-full text center flex justify-between flex-wrap opacity-50'>
          <span>&copy; 2026 Toeankoe Barbershop</span>
          <span>Privacy Policy</span>
          <Link target='_blank' href={"https://www.instagram.com/uund14"} >Crafted By Ulum</Link>
        </footer>
      </section>
    </>
  )
}