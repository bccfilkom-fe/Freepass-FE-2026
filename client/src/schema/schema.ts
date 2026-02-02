import { z } from "zod";

export const SignUpSchema = z.object({
  displayName: z
    .string()
    .min(3, "Display Name must be at least 3 characters long")
    .max(10, "Display Name maximum 10 characters long"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
  })
  
export const SignInSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  rememberMe: z
    .boolean()
})



export type SignUpCredentials = z.infer<typeof SignUpSchema>
export type SignInCredentials = z.infer<typeof SignInSchema>