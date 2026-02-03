"use client"
import { createClient } from "@/lib/supabase/client";;
import { movement } from "@/types/movements";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMovements(type?: string | null) {
  return useQuery({
    queryKey: ["movements", type],
    queryFn: async () => {
      const supabase = createClient();
      const userid = (await supabase.auth.getUser()).data.user?.id;

      let query = supabase
        .from("nexstore_inventory_movements")
        .select("*, nexstore_product!inner(*)")
        .eq("user_id", userid)
        .order("id", { ascending: true });

      if (type) query = query.eq("type", type)

      const { data, error } = await query;

      if (error) throw new Error(error.message)

      const mv: movement[] = data;
      return mv;
    }
  })
}

export function useDeleteMovement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const supabase = createClient();
      const response = await supabase
        .from('nexstore_inventory_movements')
        .delete()
        .eq('id', id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movements"] })
    }
  })
}
