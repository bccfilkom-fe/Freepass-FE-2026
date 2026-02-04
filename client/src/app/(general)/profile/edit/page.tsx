import { Suspense } from "react"
import ProfileEdit from "./ProfileEdit"
import Spinner from "@/components/ui/spinner"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit profile to manage your personalization at Toeankoe Barbershop Apps. Update your info, track past appointments, and view upcoming bookings effortlessly."
}

const ProfileEditPage = () => {
  return (
    <Suspense fallback={
      <section className="w-full py-20 flex justify-center items-center">
        <Spinner size="3rem" color="var(--color-primary-foreground)"/>
      </section>
    }>
      <ProfileEdit />
    </Suspense>
  )
}

export default ProfileEditPage