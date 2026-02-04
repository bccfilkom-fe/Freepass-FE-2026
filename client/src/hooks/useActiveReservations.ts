import { getCustomerAppointments } from "@/services/customer.service"
import { Reservation } from "@/types/type"
import { useQuery } from "@tanstack/react-query"

export const useReservations = ({
  startDate, endDate, status
}: {
  startDate: string, endDate: string, status?: string
}) => {
  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["active-reservation", startDate, endDate, status],
    queryFn: () => getCustomerAppointments({
      startDate, endDate, status
    })
  })

  return {
    activeReservations: data?.data as Reservation[], isFetching, isPending, error
  }
}