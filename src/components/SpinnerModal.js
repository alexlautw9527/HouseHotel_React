import { DotPulse } from '@uiball/loaders'
import { useState } from 'react'

export default function SpinnerModel() {

  return (
    <>
      <div className='fixed inset-0 bg-secondary bg-opacity-75 transition-opacity w-screen h-screen flex justify-center items-center z-50'>
        <DotPulse
          size={100}
          speed={1}
          color="black"
        />
      </div>
    </>
  )
}