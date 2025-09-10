/* eslint-disable no-unused-vars */
import React,{useContext,useState,useEffect} from 'react'
import {FoodContext} from "../context/context";
import {food_list,assets} from "../assets/assets.js"
import { Link } from 'react-router-dom';

const Cart = () => {
  let {getTotalCartAmount,cart,removeFromCart}=useContext(FoodContext);
  
  return (
    <div className='flex flex-col w-full justify-center items-center px-4 sm:px-6 lg:px-8'>
      
      {/* Cart Items Section */}
      <div className='w-full max-w-6xl mt-8 sm:mt-12 lg:mt-20'>
        
        {/* Desktop Table Header - Hidden on mobile */}
        <div className='hidden lg:grid lg:grid-cols-6 gap-4 p-4 bg-gray-100 rounded-lg mb-4 font-semibold text-gray-600'>
          <div>Items</div>
          <div>Title</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
          <div>Remove</div>
        </div>
        
        {/* Cart Items */}
        <div className='space-y-4 lg:space-y-2'>
          {
            food_list.map((element,index)=>{
              if(cart[element._id]>0){
                return (
                  <div key={element._id || index} className='bg-white shadow-sm rounded-lg border border-gray-200 p-4'>
                    
                    {/* Mobile Card Layout */}
                    <div className='flex lg:hidden items-center justify-between'>
                      <div className='flex items-center space-x-4 flex-1'>
                        <img 
                          className='h-12 w-12 sm:h-16 sm:w-16 rounded-sm object-cover' 
                          src={element.image}
                          alt={element.name}
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-gray-800 text-sm sm:text-base truncate'>{element.name}</p>
                          <p className='text-gray-600 text-sm'>${element.price}</p>
                          <p className='text-gray-600 text-sm'>Qty: {cart[element._id]}</p>
                        </div>
                      </div>
                      <div className='flex flex-col items-end space-y-2'>
                        <p className='font-semibold text-gray-800 text-sm sm:text-base'>${element.price*cart[element._id]}</p>
                        <img 
                          className='h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity' 
                          onClick={()=>{removeFromCart(element._id)}} 
                          src={assets.cross_icon}
                          alt="Remove item"
                        />
                      </div>
                    </div>

                    {/* Desktop Grid Layout */}
                    <div className='hidden lg:grid lg:grid-cols-6 gap-4 items-center'>
                      <img 
                        className='h-12 w-12 rounded-sm object-cover' 
                        src={element.image}
                        alt={element.name}
                      />
                      <p className='font-medium text-gray-800'>{element.name}</p>
                      <p className='text-gray-600'>${element.price}</p>
                      <p className='text-gray-600'>{cart[element._id]}</p>
                      <p className='font-semibold text-gray-800'>${element.price*cart[element._id]}</p>
                      <img 
                        className='h-6 w-6 cursor-pointer hover:opacity-70 transition-opacity justify-self-center' 
                        onClick={()=>{removeFromCart(element._id)}} 
                        src={assets.cross_icon}
                        alt="Remove item"
                      />
                    </div>
                  </div>
                )
              }
              return null;
            })
          }
        </div>
      </div>

      {/* Cart Summary Section */}
      <div className='mt-16 sm:mt-20 lg:mt-32 flex flex-col lg:flex-row justify-between w-full max-w-6xl gap-8 lg:gap-12'>
        
        {/* Cart Totals */}
        <div className='flex flex-col bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 w-full lg:max-w-md'>
          <h1 className='font-bold text-xl sm:text-2xl mb-4 text-center lg:text-left'>Cart Totals</h1>
          
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
            <p>${getTotalCartAmount()+5}</p>
          </div>
          
          <Link to='/checkout' className='w-full'>
            <button className='bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-colors duration-200 py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-white font-semibold mt-4 sm:mt-6 w-full text-sm sm:text-base touch-manipulation'>
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>

        {/* Promo Code Section */}
        <div className='flex flex-col bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 w-full lg:max-w-md'>
          <p className='text-gray-700 mb-4 text-sm sm:text-base font-medium text-center lg:text-left'>
            If you have a promo code, enter it here
          </p>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-0'>
            <input 
              placeholder='Promo code' 
              className='bg-gray-100 placeholder:text-gray-500 p-3 sm:p-4 rounded-l-md sm:rounded-r-none outline-none border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 flex-1 text-sm sm:text-base' 
              type='text' 
            />
            <button className='bg-black hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 text-white p-3 sm:p-4 rounded-r-md sm:rounded-l-none font-semibold text-sm sm:text-base touch-manipulation'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart