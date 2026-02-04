import privateApi from "@/lib/axios-interceptor"
import { Service } from "@/types/type"
import { useQuery } from "@tanstack/react-query"

export const useServices = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await privateApi.get("/services")
      return response.data
    }
  })

  return {
    services: data?.data as Service[],
    isPending,
    error
  }
}