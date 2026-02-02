// import { User } from "@supabase/supabase-js";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type authStore = {
//   user: User | null,
//   isLoggedIn: boolean,
//   setUser: (user: User) => void,
//   setIsLoggedIn: (isLoggedIn: boolean) => void
// }

// export const useAuthStore = create<authStore>()(
//   persist(
//     (set) => ({
//       user: null,
//       isLoggedIn: false,
//       setUser: (user) => set({ user: user }),
//       setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn })
//     }),
//     { name: "authStore" }
//   )
// )