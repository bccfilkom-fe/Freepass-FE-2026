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


export const categorySchema = z.object({
  name: z.string().max(50, "Maksimal 50 karakter"),
  description: z.string().max(200, "Maksimal 200 karakter").nullable(),
})

export type categoryData = z.infer<typeof categorySchema>;



export const ProductSchema = z.object({
  code: z.string().min(5, "Kode minimal 5 karakter."),
  qty: z.coerce.number().min(0, "Minimal jumlah adalah 0"),
  title: z.string().max(50, "Maksimal 50 karakter."),
  price: z.coerce.number().min(0, "Harga tidak boleh minus"),
  description: z.string().max(200, "Maksimal 200 karakter"),
  category_id: z.coerce.number().min(1, "category id tidak valid")
})

export type productData = z.infer<typeof ProductSchema>;


export const MovementSchema = z.object({
  product_id: z.coerce.number().min(1, "Product id tidak valid."),
  type: z.enum(['IN', 'OUT'], "Tipe tidak valid."),
  quantity: z.coerce.number().min(1, "Kuantitas harus lebih dari 0"),
  note: z.string().max(200, "Maksimal 200 karakter"),
})

export type movementData = z.infer<typeof MovementSchema>;