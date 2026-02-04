"use client"
import { handleLogout } from "@//actions/authActions"
import { useActionState } from "react"

function LogoutBtn() {
  const [state, formAction, isPending] = useActionState(handleLogout, {
    success: false,
    message: ""
  })
  return (
    <form action={formAction}>
      <button type="submit" className='flex w-full items-center px-4 py-3 text-sm font-medium hover:text-white hover:[&_svg]:text-white transition-all duration-200 hover:bg-black/70 rounded-lg group cursor-pointer hover:bg-red-700! disabled:opacity-50 disabled:bg-red-700' disabled={isPending}>
        {isPending ? "Memproses..." : "Logout"}
      </button>
    </form>
  )
}

export default LogoutBtn