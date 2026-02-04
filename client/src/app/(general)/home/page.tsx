import { Metadata } from "next"
import HomePage from "./HomePage"

export const metadata: Metadata = {
  title: "Home",
  description: "At home, you can browse our services, see available stylists, and book your next haircut quickly and easily."
}

export default function Home() {
  return (
    <HomePage />
  )
}
