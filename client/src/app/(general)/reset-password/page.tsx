import { Suspense } from 'react'
import ResetPassword from './ResetPassword'
import Spinner from '@/components/ui/spinner'

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<section className='w-full max-w-xl h-screen mx-auto flex justify-center items-center'><Spinner/></section>}>
      <ResetPassword />
    </Suspense>
  )
}

export default ResetPasswordPage
