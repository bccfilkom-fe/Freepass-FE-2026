'use server'

import { useSession } from "@/hooks/useSesssion";
import { SignInCredentials, SignUpCredentials } from "@/schema/schema";
import axios, { AxiosError } from "axios";

export const signUpService = async (signUpPayload: SignUpCredentials) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, signUpPayload)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Sign up failed")
    }
    throw new Error("Something went wrong")
  }
}

export const signInService = async (signInPayload: SignInCredentials & { rememberMe: boolean }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, signInPayload, {
      withCredentials: true
    })
    const { accessToken, user, message } = response.data;
  
    const mappedUser = {
      displayName: user.displayName,
      email: user.displayName,
      role: user.role,
      avatarUrl: user.avatarUrl
    }
  
    useSession.setState({
      accessToken,
      user: mappedUser
    })
  
    return {message}
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Sign in failed")
    }
    throw new Error("Something went wrong")
  }
}