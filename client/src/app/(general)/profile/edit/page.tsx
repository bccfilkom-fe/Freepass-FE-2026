import { Suspense } from "react"
import ProfileEdit from "./ProfileEdit"
import Spinner from "@/components/ui/spinner"

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