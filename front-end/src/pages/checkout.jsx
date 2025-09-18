/* eslint-disable no-unused-vars */
import React, {useContext} from 'react'
import {FoodContext} from "../context/context"
import {loadStripe} from "@stripe/stripe-js"
const Checkout = () => {
  let stripe_key = import.meta.env.STRIPE_PUBLIC_KEY ;
  let {getTotalCartAmount} = useContext(FoodContext);
  const makePayment =async()=>{
    const stripe = await loadStripe(stripe_key);
    const body = {
    }
    const header = {
      "Content-Type":"application/json"
    }
    const response = await fetch(`http://localhost:3000/create-checkout-session`,{
      method:"POST",
      headers:header,
      body:JSON.stringify(body)
    });

    const session =await response.json();
    const result = stripe.redirectToCheckout({
      sessionId:session.id
    });

    if(result.error){
      console.log(result.error);
    }
  }
  return (
    <div className='flex w-full justify-center items-start py-4 sm:py-8'>
      <div className='flex flex-col lg:flex-row mt-8 lg:mt-14 w-full max-w-7xl justify-center lg:justify-around gap-8 lg:gap-40 px-4 sm:px-6 lg:px-8'>
        
        {/* Delivery Information Form */}
        <div className='flex flex-col flex-1 max-w-2xl'>
          <h1 className='font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center lg:text-left'>Delivery Information</h1>
          <form className='flex flex-col gap-3 sm:gap-4'>
            
            {/* Name Fields */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <input 
                type='text' 
                name="firstname" 
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base' 
                placeholder='First name'
              />
              <input 
                type='text' 
                name="lastname" 
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base' 
                placeholder='Last name'
              />
            </div>
            
            {/* Email */}
            <input 
              type='email' 
              name="email" 
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base'  
              placeholder='Email address'
            />
            
            {/* Street */}
            <input 
              type='text' 
              name="street" 
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base' 
              placeholder="Street"
            />
            
            {/* City and State */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <input 
                type='text'
                name='city'  
                placeholder='City' 
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base'
              />
              <input 
                type='text' 
                name='state' 
                placeholder='State' 
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base'
              />
            </div>
            
            {/* Zip Code and Country */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <input 
                type='text' 
                name="zipcode" 
                placeholder='Zip code'
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base'
              />
              <input 
                type="text" 
                name="country" 
                placeholder='Country'
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base'
              />
            </div>
            
            {/* Phone */}
            <input 
              type='tel' 
              name="phone" 
              placeholder='Phone' 
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base'
            />
          </form>
        </div>

        {/* Cart Totals */}
        <div className='flex flex-col bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 w-full lg:min-w-[400px] lg:max-w-[450px] mt-6 lg:mt-0'>
          <h1 className='font-bold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4 text-center lg:text-left'>Cart Totals</h1>
          
          <div className='flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base'>
            <p className='text-gray-600'>Subtotal</p>
            <p className='font-semibold'>${getTotalCartAmount()}</p>
          </div>
          
          <div className='flex justify-between py-2 sm:py-3 border-b border-gray-200 text-sm sm:text-base'>
            <p className='text-gray-600'>Delivery Fee</p>
            <p className='font-semibold'>$5</p>
          </div>
          
          <div className='flex justify-between py-2 sm:py-3 text-base sm:text-lg font-bold border-b border-gray-200'>
            <p>Total</p>
            <p>${getTotalCartAmount() + 5}</p>
          </div>
          
          <button onClick={makePayment()} className='bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-colors duration-200 py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-white font-semibold mt-4 sm:mt-6 w-full text-sm sm:text-base touch-manipulation'>
            PLACE ORDER
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default Checkout