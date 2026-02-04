'use client'

import { useIsMobile } from "@/hooks/useIsMobile";
import { logoutService } from "@/services/auth.service";
import { useRouter } from '@bprogress/next/app';
import Image from "next/image";
import { toast } from "sonner";
import MainButton from "../button/MainButton";
import HamburgerMenu from "../ui/hamburger-menu";
import { useSession } from "@/hooks/useSession";
import { User } from "@/types/type";

const navListButton = {
  guest: [
    {
      content: "Shop",
      url: "/shop",
      variant: "outline"
    },
    {
      content: "Sign In",
      url: "/signin",
      variant: "outline"
    },
    {
      content: "Book Now",
      url: "/book",
      variant: "primary"
    },
  ],
  customer: [
    {
      content: "Shop",
      url: "/shop",
      variant: "outline"
    },
    {
      content: "Profile",
      url: "/profile",
      variant: "outline"
    },
    {
      content: "Book Now",
      url: "/book",
      variant: "primary"
    },
  ],
  barber: [
    {
      content: "Barber Dashboard",
      url: "/barber",
      variant: "primary"
    }
  ],
  admin: [
    {
      content: "Admin Dashboard",
      url: "/admin",
      variant: "primary"
    }
  ],
}

const Navbar = () => {
  const router = useRouter()
  const isMobile = useIsMobile();
  const { user } = useSession();

  return (
    <header className='w-full max-w-[1620px] p-6 lg:p-12 lg:py-8 fixed top-0 z-49 left-1/2 -translate-x-1/2'>
      <nav
        className="w-full h-14 flex justify-between gap-2 items-center bg-card lg:bg-transparent lg:backdrop-blur-none backdrop-blur-2xl rounded-md"
        >
          {/* LOGO */}
          <button 
            onClick={() => router.push("/home", { showProgress: true })}
            className="flex h-14 gap-2 px-4 py-1 items-center lg:bg-card rounded-md relative cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300">
            <div className="relative h-8 w-8 rounded-md bg-white">
              <Image
                src="/logo.svg"
                alt="logo-toeankoe"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl">Toeankoe</h1>
          </button>

          {/* NAVIGATION */}
          <ul className="h-14 flex items-center gap-2 p-2 border rounded-md lg:bg-card">
            { isMobile ? (
              <div className="bg-primary-foreground p-2 rounded-md hover:scale-105 active:scale-95 transition-all duration-300">
                <HamburgerMenu />
              </div>
            ) : (
              <>
                {navListButton[
                  user && user.role && typeof user.role === 'string' && ['customer', 'barber', 'admin'].includes(user?.role.toLowerCase())
                    ? user.role.toLowerCase() as 'customer' | 'barber' | 'admin'
                    : 'guest'
                ].map((button, index) => {
                  if (button.url.startsWith("/profile")) {
                    return (
                      <div className="relative group w-fit" key={index}>
                        <MainButton
                          variant="outline"
                          onClick={() => router.push(button.url, { showProgress: true })}
                        >
                          {button.content}
                        </MainButton>

                        {/* DROPDOWN MENU PROFILE */}
                        <DropdownProfile user={user} profileUrl={button.url}/>
                      </div>

                    )
                  }

                  return (
                    <MainButton key={index} variant={button.variant as "outline" | "primary" | "secondary"} onClick={() => router.push(button.url, { showProgress: true })}>
                      {button.content}
                    </MainButton>
                  )
                })}
              </>
            )}
          </ul>
      </nav>

    </header>
  )
}

export default Navbar



const DropdownProfile = ({ user, profileUrl }: { user: User | null, profileUrl: string }) => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutService()

      router.replace("/home", { showProgress: true })
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <div
      className="
        absolute top-full w-fit
        p-3 rounded-md bg-card
        flex flex-col gap-1
        opacity-0 pointer-events-none
        group-hover:opacity-100 group-hover:pointer-events-auto
        transition
      "
      >
      <div className="text-left">
        <h1 className="line-clamp-1">{user?.displayName}</h1>
        <h2 className="text-sm line-clamp-1">{user?.email}</h2>
      </div>
      <hr className="w-[90%] my-3" />
      <MainButton className="w-full" variant="outline" onClick={() => router.push(profileUrl, { showProgress: true })}>My Profile</MainButton>
      <MainButton className="w-full" variant="destructive" onClick={() => handleLogout()}>Sign Out</MainButton>
      </div>
  )
}