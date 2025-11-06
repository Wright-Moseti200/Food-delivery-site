/* eslint-disable no-unused-vars */
import React,{useContext,useState,useEffect} from 'react'
import {FoodContext} from "../context/context";
import {assets} from "../assets/assets.js"
import { Link } from 'react-router-dom';

const Cart = () => {
  let {cart, removeFromCart} = useContext(FoodContext);
  let [foodList, setfoodlist] = useState([]);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("auth-token");
  
  // Function to get the appropriate cart based on login status
  const getCartToUse = () => {
    if (isLoggedIn) {
      return cart || {};
    } else {
      // Return empty cart for non-logged in users
      return {};
    }
  };

  // Get cart count safely
  const getCartCount = (itemId) => {
    const currentCart = getCartToUse();
    return currentCart[itemId] || 0;
  };

  // Calculate total cart amount safely
  const getTotalCartAmount = () => {
    const currentCart = getCartToUse();
    let totalAmount = 0;
    foodList.forEach((element) => {
      if (currentCart[element.id] > 0) {
        totalAmount += element.price * currentCart[element.id];
      }
    });
    return totalAmount;
  };

  let apiCall = async() => {
    try {
      let response = await fetch('http://localhost:3000/api/product/sendProductData');
      let data = await response.json();
      setfoodlist(data.products);
    } catch(error) {
      alert(error.message);
    }
  }
  
  useEffect(() => {
    apiCall();
  }, []); // ✅ Fixed: Removed foodList dependency to prevent infinite loops

  const currentCart = getCartToUse();

  return (
    <div className='flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8'>
      
      {/* Cart Items Section */}
      <div className='w-full max-w-6xl mt-8 sm:mt-12 lg:mt-20'>
        
        {/* Show message if cart is empty */}
        {Object.keys(currentCart).length === 0 && (
          <div className='py-12 text-center'>
            <p className='text-lg text-gray-600'>Your cart is empty</p>
            <Link to="/" className='inline-block mt-4 text-orange-500 hover:text-orange-600'>
              Start shopping
            </Link>
          </div>
        )}

        {/* Desktop Table Header - Hidden on mobile */}
        {Object.keys(currentCart).length > 0 && (
          <>
            <div className='hidden gap-4 p-4 mb-4 font-semibold text-gray-600 bg-gray-100 rounded-lg lg:grid lg:grid-cols-6'>
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
                foodList.map((element,index)=>{
                  const cartCount = getCartCount(element.id);
                  if(cartCount > 0){
                    return (
                      <div key={index} className='p-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
                        
                        {/* Mobile Card Layout */}
                        <div className='flex items-center justify-between lg:hidden'>
                          <div className='flex items-center flex-1 space-x-4'>
                            <img 
                              className='object-cover w-12 h-12 rounded-sm sm:h-16 sm:w-16' 
                              src={element.image_url}
                              alt={element.name}
                            />
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-gray-800 truncate sm:text-base'>{element.name}</p>
                              <p className='text-sm text-gray-600'>${element.price}</p>
                              <p className='text-sm text-gray-600'>Qty: {cartCount}</p>
                            </div>
                          </div>
                          <div className='flex flex-col items-end space-y-2'>
                            <p className='text-sm font-semibold text-gray-800 sm:text-base'>${element.price * cartCount}</p>
                            <img 
                              className='w-5 h-5 transition-opacity cursor-pointer hover:opacity-70' 
                              onClick={()=>{removeFromCart(element.id)}} 
                              src={assets.cross_icon}
                              alt="Remove item"
                            />
                          </div>
                        </div>

                        {/* Desktop Grid Layout */}
                        <div className='items-center hidden gap-4 lg:grid lg:grid-cols-6'>
                          <img 
                            className='object-cover w-12 h-12 rounded-sm' 
                            src={element.image_url}
                            alt={element.name}
                          />
                          <p className='font-medium text-gray-800'>{element.name}</p>
                          <p className='text-gray-600'>${element.price}</p>
                          <p className='text-gray-600'>{cartCount}</p>
                          <p className='font-semibold text-gray-800'>${element.price * cartCount}</p>
                          <img 
                            className='w-6 h-6 transition-opacity cursor-pointer hover:opacity-70 justify-self-center' 
                            onClick={()=>{removeFromCart(element.id)}} 
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
          </>
        )}
      </div>

      {/* Cart Summary Section - Only show if cart has items */}
      {Object.keys(currentCart).length > 0 && (
        <div className='flex flex-col justify-between w-full max-w-6xl gap-8 mt-16 sm:mt-20 lg:mt-32 lg:flex-row lg:gap-12'>
          
          {/* Cart Totals */}
          <div className='flex flex-col w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 lg:max-w-md'>
            <h1 className='mb-4 text-xl font-bold text-center sm:text-2xl lg:text-left'>Cart Totals</h1>
            
            <div className='flex justify-between py-2 text-sm border-b border-gray-200 sm:py-3 sm:text-base'>
              <p className='text-gray-600'>Subtotal</p>
              <p className='font-semibold'>${getTotalCartAmount()}</p>
            </div>
            
            <div className='flex justify-between py-2 text-sm border-b border-gray-200 sm:py-3 sm:text-base'>
              <p className='text-gray-600'>Delivery Fee</p>
              <p className='font-semibold'>$5</p>
            </div>
            
            <div className='flex justify-between py-2 text-base font-bold border-b border-gray-200 sm:py-3 sm:text-lg'>
              <p>Total</p>
              <p>${getTotalCartAmount()+5}</p>
            </div>
            
            {isLoggedIn ? (
              <Link to='/checkout' className='w-full'>
                <button className='w-full px-4 py-2 mt-4 text-sm font-semibold text-white transition-colors duration-200 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 sm:py-3 sm:px-6 rounded-xl sm:mt-6 sm:text-base touch-manipulation'>
                  PROCEED TO CHECKOUT
                </button>
              </Link>
            ) : (
              <div className='p-3 mt-4 text-center border border-yellow-200 rounded-lg sm:mt-6 bg-yellow-50'>
                <p className='text-sm text-yellow-800'>Please log in to proceed to checkout</p>
              </div>
            )}
          </div>

          {/* Promo Code Section */}
          <div className='flex flex-col w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 lg:max-w-md'>
            <p className='mb-4 text-sm font-medium text-center text-gray-700 sm:text-base lg:text-left'>
              If you have a promo code, enter it here
            </p>
            <div className='flex flex-col gap-2 sm:flex-row sm:gap-0'>
              <input 
                placeholder='Promo code' 
                className='flex-1 p-3 text-sm bg-gray-100 border border-gray-300 outline-none placeholder:text-gray-500 sm:p-4 rounded-l-md sm:rounded-r-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 sm:text-base' 
                type='text' 
              />
              <button className='p-3 text-sm font-semibold text-white transition-colors duration-200 bg-black hover:bg-gray-800 active:bg-gray-900 sm:p-4 rounded-r-md sm:rounded-l-none sm:text-base touch-manipulation'>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login prompt for non-logged users with items in cart */}
      {!isLoggedIn && Object.keys(currentCart).length > 0 && (
        <div className='w-full max-w-6xl p-4 mt-8 text-center border border-blue-200 rounded-lg bg-blue-50'>
          <p className='text-blue-800'>Please log in to save your cart and proceed to checkout.</p>
        </div>
      )}
    </div>
  )
}

export default Cart