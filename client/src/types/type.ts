export type User = {
  displayName: string,
  email: string,
  role: Role,
  avatarUrl: string
}

export type Role = "CUSTOMER" | "ADMIN" | "BARBER" | "GUEST"