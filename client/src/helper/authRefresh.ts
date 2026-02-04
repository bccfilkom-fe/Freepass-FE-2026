import privateApi from "@/lib/axios-interceptor"
import { User } from "@/types/type"
import axios from "axios"

const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

let refreshPromise: Promise<{ token: string, user: User }> | null = null

export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshClient.post(`/auth/refresh`)
    .then(res => {
      const token = res.data.accessToken
      const user = res.data.user
      privateApi.defaults.headers.common.Authorization = `Bearer ${token}`
      
      return { user, token }
    })
    .catch(error => {
      refreshPromise = null
      throw error
    })
  }

  const result = await refreshPromise
  refreshPromise = null
  return result
}