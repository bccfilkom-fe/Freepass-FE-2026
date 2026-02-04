import { z } from 'zod';
import { productSchema } from '@/features/product/schema';

export const cartProductSchema = z.object({
    productId: z.number(),
    quantity: z.number().min(1),
});

export const cartSchema = z.object({
    id: z.number(),
    userId: z.number(),
    date: z.string(),
    products: z.array(cartProductSchema),
});

export const cartItemSchema = productSchema.extend({
    quantity: z.number(),
});

export const updateCartSchema = z.object({
    userId: z.number(),
    products: z.array(cartProductSchema),
});

export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type UpdateCartData = z.infer<typeof updateCartSchema>;

