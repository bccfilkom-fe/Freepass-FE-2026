import { z } from "zod"

export const ChangeDisplayNameSchema = z.object({
  displayName: z
    .string()
    .min(1, "Field is empty")
    .min(3, "Display Name must be at least 3 characters long")
    .max(10, "Display Name maximum 10 characters long")
})

export const ChangePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, "Field is empty"),
  newPassword: z
    .string()
    .min(8, "New Password must be at least 8 characters long")
})


export type ChangeDisplayNameCredentials = z.infer<typeof ChangeDisplayNameSchema>
export type ChangePasswordCredentials = z.infer<typeof ChangePasswordSchema>