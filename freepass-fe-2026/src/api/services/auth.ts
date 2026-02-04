import api from "../core/axios"

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', {
      username,
      password,
    })
    return response.data
  },
}