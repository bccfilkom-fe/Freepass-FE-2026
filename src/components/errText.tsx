import { ReactNode } from "react"

function ErrText({ teks }: { teks: string }) {
  return (
    <p className="text-sm px-3 text-red-700">✖ {teks}</p>
  )
}

export default ErrText