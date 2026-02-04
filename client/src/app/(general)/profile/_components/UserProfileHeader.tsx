import Image from "next/image"
import ImageUpload from "../edit/ImageUpload"
import { User } from "@/types/type"
import { Skeleton } from "@/components/ui/skeleton"

const UserProfileHeader = ({ user }: { user: User }) => {
  return (
    <div className='flex gap-5 sm:gap-10 flex-col sm:flex-row'>
      <div className='relative h-40 w-40 rounded-full overflow-hidden shrink-0'>
        <Image placeholder='data:image/placeholder.webp' blurDataURL='/something_wrong.webp' src={user.avatarUrl} fill alt='user_profile' className='object-cover object-top'/>
      </div>
      <div className='w-fit h-fit sm:h-auto flex flex-col justify-center line-clamp-2'>
        <h1 className='text-3xl font-bold line-clamp-1'>{user.displayName}</h1>
        <h2 className='text-xl font-light line-clamp-1'>{user.email}</h2>

        <ImageUpload />
      </div>
    </div>
  )
}

export default UserProfileHeader


export const UserProfileHeaderSkeleton = () => {
  return (
    <div className="flex gap-5 sm:gap-10 flex-col sm:flex-row">
      <Skeleton className="h-40 w-40 overflow-hidden rounded-full shrink-0" />

      <div className="w-fit h-fit sm:h-auto flex flex-col justify-center gap-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-10 w-32 mt-2" />
      </div>
    </div>
  )
}