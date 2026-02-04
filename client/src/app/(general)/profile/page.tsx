import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit profile to manage your personalization at Toeankoe Barbershop Apps. Update your info, track past appointments, and view upcoming bookings effortlessly."
}

const ProfilePage = () => {
  redirect("/profile/edit")
}

export default ProfilePage