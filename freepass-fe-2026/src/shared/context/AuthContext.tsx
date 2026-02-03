"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/src/api/services/auth'

interface User {
  username: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
  })

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [loading, setLoading] = useState(false)


  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password)
      
      setToken(response.token)
      setUser({ username })
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify({ username }))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

