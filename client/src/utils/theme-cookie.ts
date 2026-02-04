export const THEME_COOKIE_KEY = 'theme'

export const setThemeCookie = (theme: 'light' | 'dark') => {
  document.cookie = `${THEME_COOKIE_KEY}=${theme}; path=/; max-age=31536000`
}

export const getThemeCookie = (): 'light' | 'dark' | null => {
  if (typeof document === 'undefined') return null

  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${THEME_COOKIE_KEY}=`))

  return match ? (match.split('=')[1] as 'light' | 'dark') : null
}