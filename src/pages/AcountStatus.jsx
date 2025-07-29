import React, { useState } from 'react'
import FormImage from '../components/FormImage/FormImage'
import FormInput from '../components/formInput/FormInput'
import { Outlet } from 'react-router-dom'

export default function AcountStatus() {
  return (
    <div className='flex justify-center items-stretch min-h-screen'>
  <div className='hidden md:flex w-1/2'>
    <FormImage />
  </div>
  <div className='w-full md:w-1/2 flex flex-col justify-center items-center   md:px-10 lg:px-20 px-20'>
    <Outlet/>
  </div>
</div>

  )
}