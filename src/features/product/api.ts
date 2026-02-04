import api from '@/shared/lib/axios';
import { productsSchema, productSchema, type Product } from './schema';

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await api.get('/products');
    return productsSchema.parse(data);
  },

  getProduct: async (id: number): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return productSchema.parse(data);
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get('/products/categories');
    return data;
  },
};

