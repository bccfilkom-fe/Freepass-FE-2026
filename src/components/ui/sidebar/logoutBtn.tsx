"use client"
import { handleLogout } from "@/actions/authActions"
import { useActionState } from "react"

function LogoutBtn() {
  const [state, formAction, isPending] = useActionState(handleLogout, {
    success: false,
    message: ""
  })
  return (
    <form action={formAction}>
      <button type="submit" className='menus w-full hover:bg-red-700! disabled:opacity-50 disabled:bg-red-700' disabled={isPending}>
        {isPending ? "Memproses..." : "Logout"}
      </button>
    </form>
  )
}

export default LogoutBtn