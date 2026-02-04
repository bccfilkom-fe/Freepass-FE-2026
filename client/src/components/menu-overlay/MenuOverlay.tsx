'use client'

// import { listLinkShortcut } from "@/app/(landing-page)/home/(home-sections)/Footer";
// import TransitionLink from "./TransitionLink";
import { useMenu } from "@/hooks/useMenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { useSession } from "@/hooks/useSession";
import MainButton from "../button/MainButton";
import { useTransitionRouterWithProgress } from "@/hooks/useTransitionRouterWithProgress";
import { logoutService } from "@/services/auth.service";
import { toast } from "sonner";

export const navListGeneral = {
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
      content: "Book Now",
      url: "/book",
      variant: "primary"
    },
    {
      content: "Profile",
      url: "/profile",
      variant: "outline"
    }
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

const MenuOverlay = () => {
  const { isOpenMenu, setIsOpenMenu } = useMenu();
  const menuRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const isFirstMount = useRef(true)
  const { user } = useSession();
  const router = useTransitionRouterWithProgress()

  const handleLogout = async () => {
    try {
      await logoutService()

      router.replace("/home")
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useLayoutEffect(() => {
    gsap.set(menuRef.current, {
      clipPath: "circle(0% at 50% 50%)",
    })
    setIsOpenMenu(false)
  }, [pathname])

  useGSAP(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    const timeline = gsap.timeline()

    if (isOpenMenu) {
      timeline.fromTo(menuRef.current, {
        duration: 2.5,
        clipPath: "circle(0% at 50% 50%)",
        ease: "expo.out",
      }, {
        clipPath: "circle(100% at 50% 50%)",
      })
    } else {
      timeline.fromTo(menuRef.current, {
        duration: 2.5,
        clipPath: "circle(100% at 50% 50%)",
        ease: "expo.out",
      }, {
        clipPath: "circle(0% at 50% 50%)",
      })
    }
  }, [isOpenMenu])

  return (
    <section
      ref={menuRef}
      className={`
        bg-primary inset-0 fixed z-47 ${isOpenMenu ? "" : "pointer-events-none"}
        flex justify-center items-center transition-all duration-1500
      `}
    >
      <ul className="text-primary w-full max-w-64 flex flex-col items-center gap-3 lg:gap-4">
        {
          navListGeneral[
            user && user.role && typeof user.role === 'string' && ['customer', 'barber', 'admin'].includes(user?.role.toLowerCase())
              ? user.role.toLowerCase() as 'customer' | 'barber' | 'admin'
              : 'guest'
          ].map((button, index) => {
            if (!button.url.startsWith("/profile")) {
              return (
                <MainButton
                  className="w-full"
                  key={index}
                  variant={button.variant as "outline" | "primary" | "secondary"}
                  onClick={() => router.push(button.url)}>
                    {button.content}
                </MainButton>
              )
            }
            
            return (
              <div className="relative w-full flex flex-col gap-10" key={index}>
                <MainButton
                  className="w-full"
                  variant="outline"
                  onClick={() => router.push(button.url)}
                >
                  {button.content}
                </MainButton>

                <MainButton
                  className="w-full"
                  variant="destructive"
                  onClick={() => handleLogout()}>
                    Sign Out
                </MainButton>
              </div>
            )
          })
        }
      </ul>
    </section>
  )
};

export default MenuOverlay;