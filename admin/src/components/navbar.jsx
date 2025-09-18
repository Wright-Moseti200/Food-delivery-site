import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = () => {
  return (
    <div className='w-full flex h-20 items-center'>
      <div className='flex items-center justify-start w-full px-4 sm:px-6 lg:px-8'>
        <img className='h-10' src={assets.logo} alt="logo"/>
      </div>
    </div>
  )
}

export default Navbar