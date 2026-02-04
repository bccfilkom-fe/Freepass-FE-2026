import { refreshAccessToken } from "@/helper/authRefresh";
import { User } from "@/types/type";
import { create } from "zustand";


type useSessionType = {
  user: User | null,
  updateUser: (partial: any) => void,
  accessToken: string | null,
  loading: boolean,
  fetchSession: () => Promise<void>,
  logout: () => void
}

export const useSession = create<useSessionType>(set => ({
  user: null,
  updateUser: (partial) => {
    set(state => ({
      user: state.user ? { ...state.user, ...partial } : state.user
    }))
  },
  accessToken: null,
  loading: true,
  fetchSession: async () => {
    try {
      const { user, token } = await refreshAccessToken()

      set({
        user: user,
        accessToken: token,
        loading: false
      })
    } catch {
      set({
        user: null,
        accessToken: null,
        loading: false
      })
    }
  },
  logout: () => {
    set({
      user: null,
      accessToken: null
    })
  }
}))