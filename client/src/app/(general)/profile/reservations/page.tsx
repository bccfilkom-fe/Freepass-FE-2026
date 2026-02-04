'use client'

import { DatePickerWithRange } from "@/components/datepicker-wtihrange/DatePickerWithRange"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useReservations } from "@/hooks/useActiveReservations"
import { SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import ReservationCard from "./ReservationCard"
import ReservationSkeleton from "./ReservationSkeleton"

const ReservationsPage = () => {
  const [status, setStatus] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const { activeReservations, isPending, error } = useReservations({
    startDate, endDate, status
  })

  return (
    <section className='w-full p-2 py-5 sm:p-5'>
      <header className='text-2xl font-semibold'>
        <h1>Active Reservations</h1>
      </header>

      <main className='w-full flex flex-col gap-5 max-w-5xl mx-auto mt-5'>
        <nav className="w-full flex justify-end gap-2 sm:gap-5 flex-wrap">
          <DatePickerWithRange setEndDate={setEndDate} setStartDate={setStartDate}/>

          <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer">
              <Button variant="default">
                <SlidersHorizontal/> Filter Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
                  <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="WAITING">Waiting</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="IN_PROGRESS">In Progress</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="COMPLETED">Completed</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="CANCELLED">Cancelled</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="w-full flex flex-col gap-2">
          {(isPending) && (
            [...Array(3)].map((_, index) => (
              <ReservationSkeleton key={index}/>
            ))
          )}

          {error ? (
            <p className="text-center opacity-50">
              Oops! We couldn’t load your reservations right now. <br />
              Check your connection and try again.
            </p>
          ) : ( 
            activeReservations?.length > 0 && (
              activeReservations.map(reservation => (
                <ReservationCard key={reservation._id} reservation={reservation}/>
              ))
            )
          )}

          {!isPending && !error && !activeReservations?.length && (
            <p className="text-center opacity-50">
              No reservations available. <br />
              Please make a reservation to see it listed here.
            </p>
          )}
        </div>
      </main>
    </section>
  )
}

export default ReservationsPage