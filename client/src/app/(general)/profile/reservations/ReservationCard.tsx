import { Reservation } from '@/types/type'
import { Calendar, Clock, Spool } from "lucide-react"
import { cn } from "@/lib/utils"

const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
  return (
    <div key={reservation._id} className="w-full bg-card flex justify-between items-center p-4 sm:p-5 rounded-md hover:cursor-pointer hover:scale-102 transition-transform ease-in-out duration-300">
      <div className="flex flex-col gap-2 text-sm sm:text-base">
        <span className="flex gap-2"><Calendar/>
          {reservation.date}
        </span>
        <span className="flex gap-2"><Clock/>
          {new Date(reservation.startTime).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
          })}
          <span>-</span>
          {new Date(reservation.endTime).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
        <span className="flex gap-2 line-clamp-1">
          <Spool/>
          {reservation.services.map((service, index) => {
            if (index === reservation.services.length - 1) {
              return <span key={index}>{service.name}</span>
            }
            return <span key={index}>{service.name}{", "}</span>
          })}
        </span>
      </div>

      {/* BADGE */}
      <div
        className={cn(
          "p-3 rounded-md h-fit", 
          reservation.status === "WAITING" && "bg-neutral-500 text-white",
          reservation.status === "IN_PROGRESS" && "bg-yellow-600 text-white",
          reservation.status === "CANCELLED" && "bg-destructive text-white",
          reservation.status === "COMPLETED" && "bg-green-700 text-white",
        )}
      >
        {reservation.status.split("_").join(" ").toUpperCase()}
      </div>
    </div>
  )
}

export default ReservationCard