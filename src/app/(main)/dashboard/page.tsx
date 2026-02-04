import React, { Suspense } from 'react'
import StokRendah from './stokRendah'

function Page() {
  return (
    <>
      <Suspense>
        <StokRendah></StokRendah>
      </Suspense>
    </>
  )
}

export default Page