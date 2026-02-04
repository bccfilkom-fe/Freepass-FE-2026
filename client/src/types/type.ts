export type User = {
  displayName: string,
  email: string,
  providerType: "GENERAL" | "GOOGLE",
  role: Role,
  verified: boolean,
  avatarUrl: string,
}

export type Reservation = {
  _id: string,
  appointmentType: "RESERVATION" | "WALKIN",
  customerId: string,
  customerName: string,
  barberId: string,
  status: AppointmentStatus,
  totalDurationMinutes: number,
  totalPrice: number,
  date: string,
  startTime: string,
  endTime: string,
  services:[
    {
      serviceId: string,
      name: string,
      price: number,
      durationMinute: number,
      _id:string
    }
  ],
  rescheduleHistory: []
}

export type Service = {
  _id: string,
  name: string,
  description: string,
  price: number,
  durationMinute: number,
  imageUrl: string
}

export type Role = "CUSTOMER" | "ADMIN" | "BARBER"

export type AppointmentStatus = "WAITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"