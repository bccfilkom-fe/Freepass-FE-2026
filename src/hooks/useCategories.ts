"use client"
import { handleEditCategory } from "@/actions/categoryActions";
import { createClient } from "@/lib/supabase/client";
import { category } from "@/types/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const supabase = createClient();
      const userid = (await supabase.auth.getUser()).data.user?.id;
      const { data, error } = await supabase
        .from("nexstore_category")
        .select("*")
        .eq("user_id", userid)
        .order("id", {ascending: true})

      if (error) throw new Error(error.message)

      const cat: category[] = data;
      return cat;
    }
  })
}

export function useDeleteCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const supabase = createClient();
      const response = await supabase
        .from('nexstore_category')
        .delete()
        .eq('id', id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["categories"]})
    }
  })
}
