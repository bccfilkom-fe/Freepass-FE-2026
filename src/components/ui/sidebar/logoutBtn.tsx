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
      <button type="submit" className='bg-black/5 flex w-full items-center px-4 py-3 text-sm font-medium hover:text-white hover:[&_svg]:text-white transition-all duration-200 rounded-lg group cursor-pointer hover:bg-red-700! disabled:opacity-50 disabled:bg-red-700' disabled={isPending}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="shrink-0 w-5 h-5 mr-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        {isPending ? "Memproses..." : "Logout"}
      </button>
    </form>
  )
}

export default LogoutBtn