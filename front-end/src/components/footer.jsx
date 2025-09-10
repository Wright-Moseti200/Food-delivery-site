import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-full mt-8 text-white bg-neutral-800'>
      <div className='px-4 py-8 md:px-8 lg:px-16'>
        <div className='flex flex-col lg:flex-row lg:justify-around lg:items-start gap-8 lg:gap-4'>
          
          {/* Company Info Section */}
          <div className='flex flex-col gap-4 lg:max-w-lg xl:max-w-xl'>
            <img 
              src={assets.logo} 
              alt="Company Logo"
              className='h-8 w-auto sm:h-10 md:h-12 max-w-52'
            />
            <p className='text-sm sm:text-base leading-relaxed text-gray-300'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a gallery of type and scrambled it to make a type
              specimen book.
            </p>
            <div className='flex gap-4 mt-2'>
              <img 
                src={assets.facebook_icon} 
                alt="Facebook"
                className='w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity'
              />
              <img 
                src={assets.twitter_icon} 
                alt="Twitter"
                className='w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity'
              />
              <img 
                src={assets.linkedin_icon} 
                alt="LinkedIn"
                className='w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity'
              />
            </div>
          </div>

          {/* Company Links Section */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-lg sm:text-xl lg:text-2xl font-bold'>COMPANY</h2>
            <div className='flex flex-col gap-3'>
              <p className='text-sm sm:text-base text-gray-300 hover:text-white cursor-pointer transition-colors'>
                Home
              </p>
              <p className='text-sm sm:text-base text-gray-300 hover:text-white cursor-pointer transition-colors'>
                About us
              </p>
              <p className='text-sm sm:text-base text-gray-300 hover:text-white cursor-pointer transition-colors'>
                Delivery
              </p>
              <p className='text-sm sm:text-base text-gray-300 hover:text-white cursor-pointer transition-colors'>
                Privacy policy
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-lg sm:text-xl lg:text-2xl font-bold'>GET IN TOUCH</h2>
            <div className='flex flex-col gap-3'>
              <p className='text-sm sm:text-base text-gray-300'>
                +254714471627
              </p>
              <p className='text-sm sm:text-base text-gray-300 break-all sm:break-normal'>
                Wrightgichana@gmail.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Border/Copyright Section (Optional) */}
        <div className='border-t border-gray-700 mt-8 pt-4'>
          <p className='text-center text-xs sm:text-sm text-gray-400'>
            © 2024 Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer