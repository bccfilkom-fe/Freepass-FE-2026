import { ReactNode } from 'react'

export default function GeneralTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      { children }
    </>
  )
}
