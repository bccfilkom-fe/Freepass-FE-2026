'use client'

import { useProgress } from '@bprogress/next'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'


export const getTransitionOptions = (href: string) => {
  const noAnimateRoutes = ['/signin', '/signup']

  const shouldAnimate = !noAnimateRoutes.some(route =>
    href.startsWith(route)
  )

  return shouldAnimate
    ? { onTransitionReady: triggerPageTransition }
    : {}
}


export const useTransitionRouterWithProgress = () => {
  const router = useTransitionRouter()
  const progress = useProgress()
  const pathname = usePathname()

  const runWithProgress = useCallback(
    (fn: () => void) => {
      if (!progress.isAutoStopDisabled.current) {
        progress.start()
      }

      fn()

      const stop = () => progress.stop()

      document.addEventListener('viewtransitionend', stop, { once: true })
      setTimeout(stop, 2000)
    },
    [progress]
  )

  const push = useCallback(
    (href: string) => {
      if (pathname === href) return
      runWithProgress(() => router.push(href, getTransitionOptions(href)))
    },
    [router, runWithProgress, pathname]
  )

  const replace = useCallback(
    (href: string) => {
      if (pathname === href) return
      runWithProgress(() => router.replace(href))
    },
    [router, runWithProgress, pathname]
  )

  return {
    ...router,
    push,
    replace,
  }
}

const triggerPageTransition = () => {
  document.documentElement.animate(
    [
      { 
        clipPath: 'polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)' 
      },
      {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      },
    ],
    {
      duration: 2000,
      easing: 'cubic-bezier(0.9, 0, 0.1, 1)',
      pseudoElement: '::view-transition-new(root)',
    }
  )
}