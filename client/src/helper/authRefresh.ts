import privateApi from "@/lib/axios-interceptor"
import { User } from "@/types/type"
import axios from "axios"

let refreshPromise: Promise<{ user: User, token: string }> | null = null

export function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    )
    .then(res => {
      const token = res.data.accessToken
      privateApi.defaults.headers.common.Authorization = `Bearer ${token}`

      const user = {
        displayName: res.data.user.displayName,
        email: res.data.user.displayName,
        role: res.data.user.role,
        avatarUrl: res.data.user.avatarUrl
      }
      return { user, token }
    })
    .finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}