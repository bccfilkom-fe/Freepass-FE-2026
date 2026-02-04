'use client'

import { getThemeCookie, setThemeCookie } from '@/utils/theme-cookie'
import { ReactNode, useEffect, useState } from 'react'
import Switch from '../switch/Switch'

const ThemesProvider = ({ children }: { children: ReactNode }) => {
  const [checked, setChecked] = useState(false)

  const applyTheme = (theme: 'light' | 'dark') => {
    const html = document.documentElement
    html.classList.remove('light', 'dark')
    html.classList.add(theme)
  }

  useEffect(() => {
    const savedTheme = getThemeCookie() ?? 'light'
    applyTheme(savedTheme)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecked(savedTheme === 'dark')
  }, [])

  const handleToggle = (isChecked: boolean) => {
    const theme = isChecked ? 'dark' : 'light'
    setChecked(isChecked)
    applyTheme(theme)
    setThemeCookie(theme)
  }

  return (
    <section>
      <Switch
        className='z-48 fixed right-10 bottom-10 lg:right-20 lg:bottom-20'
        checked={checked}
        onToggle={handleToggle}
      />
      {children}
    </section>
  )
}

export default ThemesProvider