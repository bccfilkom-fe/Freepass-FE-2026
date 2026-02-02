import z from "zod";

export const signUpSchema = z.object({
  nama: z.string(),
  email: z.email({ message: "email tidak valid" }),
  password: z.string()
    .min(6, { message: "password minimal 6 karakter" })
    .regex(/[a-z]/, { message: "password harus mengandung huruf kecil" })
    .regex(/[A-Z]/, { message: "password harus mengandung huruf kapital" })
    .regex(/[0-9]/, { message: "password harus mengandung angka" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "password harus mengandung karakter spesial"
    })
})

export type signUpData = z.infer<typeof signUpSchema>;