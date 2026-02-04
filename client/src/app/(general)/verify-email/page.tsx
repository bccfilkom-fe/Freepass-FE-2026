import { Suspense } from 'react'
import Verify from './Verify'
import Spinner from '@/components/ui/spinner'

const VerifyPage = () => {
  return (
    <Suspense fallback={<section className='w-full max-w-xl h-screen mx-auto flex justify-center items-center'><Spinner/></section>}>
      <Verify />
    </Suspense>
  )
}

export default VerifyPage