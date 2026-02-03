"use client"
import { productData } from "@/lib/zodSchemas";
import { product } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts(category?: string) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.append("category", category);

      const res = await fetch(`/api/product?${params.toString()}`)

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.error}`);

      return data;
    },
    select: (res) => res.data,
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch('/api/product', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id
        })
      })

      // const result = await res.json();

      // if (!res.ok) throw new Error(`${result.error}`);

      // return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })
}