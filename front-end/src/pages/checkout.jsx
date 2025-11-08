/* eslint-disable no-unused-vars */
import React, {useContext, useState, useEffect} from 'react'
import {FoodContext} from "../context/context"
import {loadStripe} from "@stripe/stripe-js"
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  
  // Use Vite environment variable prefix
  let stripe_key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  let {cart} = useContext(FoodContext);
  let [foodList, setFoodList] = useState([]);
  let [user,setUser] = useState();

  //get credentials
  let getcredentials = async()=>{
    let response = await fetch("http://localhost:3000/api/users/getcredentials",{
      method:"get",
      headers:{
        "Content-type":"application/json",
        "auth-token":localStorage.getItem("auth-token")
      }
  });
    let data = await response.json();
    setUser(data.email);
  }
  
  // State for form data
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });


  // Fetch food data
  let apiCall = async() => {
    try {
      let response = await fetch('http://localhost:3000/api/product/sendProductData');
      let data = await response.json();
      setFoodList(data.products);
    } catch(error) {
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    apiCall();
    getcredentials();
  }, []);

  // Function to get the appropriate cart based on login status
  const getCartToUse = () => {
    if (isLoggedIn) {
      return cart || {};
    } else {
      return {};
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const makePayment = async (e) => {
    if (e) e.preventDefault();

    try {
      // Check if Stripe key is available
      if (!stripe_key) {
        console.error('Stripe public key is missing');
        return;
      }

      const stripe = await loadStripe(stripe_key);
      
      const body = {
        cart: getCartToUse(),
        deliveryInfo: formData,
        totalAmount: getTotalCartAmount() + 5,
        foodItems: foodList.filter(item => getCartToUse()[item.id] > 0),
        email:user
      };

      const response = await fetch(`http://localhost:3000/api/users/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();
      
      if (session.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id
        });

        if (result.error) {
          console.log('Stripe error:', result.error);
        }
      } else {
        throw new Error('No session ID received from server');
      }

    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  return (
    <div className='flex items-start justify-center w-full py-4 sm:py-8'>
      <div className='flex flex-col justify-center w-full gap-8 px-4 mt-8 lg:flex-row lg:mt-14 max-w-7xl lg:justify-around lg:gap-40 sm:px-6 lg:px-8'>
        
        {/* Delivery Information Form */}
        <div className='flex flex-col flex-1 max-w-2xl'>
          <h1 className='mb-4 text-xl font-bold text-center sm:text-2xl sm:mb-6 lg:text-left'>Delivery Information</h1>
          <form className='flex flex-col gap-3 sm:gap-4' onSubmit={makePayment}>
            
            {/* Name Fields */}
            <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
              <input 
                type='text' 
                name="firstname" 
                value={formData.firstname}
                onChange={handleInputChange}
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base' 
                placeholder='First name*'
                required
              />
              <input 
                type='text' 
                name="lastname" 
                value={formData.lastname}
                onChange={handleInputChange}
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base' 
                placeholder='Last name*'
                required
              />
            </div>
            
            {/* Street */}
            <input 
              type='text' 
              name="street" 
              value={formData.street}
              onChange={handleInputChange}
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base' 
              placeholder="Street*"
              required
            />
            
            {/* City and State */}
            <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
              <input 
                type='text'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                placeholder='City*' 
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base'
                required
              />
              <input 
                type='text' 
                name='state'
                value={formData.state}
                onChange={handleInputChange} 
                placeholder='State*' 
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base'
                required
              />
            </div>
            
            {/* Zip Code and Country */}
            <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
              <input 
                type='text' 
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange} 
                placeholder='Zip code*'
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base'
                required
              />
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleInputChange} 
                placeholder='Country'
                className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none flex-1 focus:border-orange-500 text-sm sm:text-base'
              />
            </div>
            
            {/* Phone */}
            <input 
              type='tel' 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange} 
              placeholder='Phone*' 
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base'
              required
            />
            
            {/* Hidden submit button for form submission */}
            <button type="submit" style={{display: 'none'}}>Submit</button>
          </form>
        </div>

        {/* Cart Totals */}
        <div className='flex flex-col bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 w-full lg:min-w-[400px] lg:max-w-[450px] mt-6 lg:mt-0'>
          <h1 className='mb-3 text-xl font-bold text-center text-gray-800 sm:text-2xl sm:mb-4 lg:text-left'>Cart Totals</h1>
          
          <div className='flex justify-between py-2 text-sm border-b border-gray-200 sm:py-3 sm:text-base'>
            <p className='text-gray-600'>Subtotal</p>
            <p className='font-semibold'>${subtotal.toFixed(2)}</p>
          </div>
          
          <div className='flex justify-between py-2 text-sm border-b border-gray-200 sm:py-3 sm:text-base'>
            <p className='text-gray-600'>Delivery Fee</p>
            <p className='font-semibold'>${deliveryFee.toFixed(2)}</p>
          </div>
          
          <div className='flex justify-between py-2 text-base font-bold border-b border-gray-200 sm:py-3 sm:text-lg'>
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          
          {/* Cart Items Preview */}
          <div className='pt-4 mt-4 border-t border-gray-200'>
            <h3 className='mb-2 font-semibold text-gray-700'>Order Summary</h3>
            <div className='space-y-2 overflow-y-auto max-h-60'>
              {foodList.map((element) => {
                const cartCount = getCartToUse()[element.id] || 0;
                if (cartCount > 0) {
                  return (
                    <div key={element.id} className='flex items-center justify-between text-sm'>
                      <span className='flex-1 truncate'>{element.name} × {cartCount}</span>
                      <span className='ml-2 font-medium'>${(element.price * cartCount).toFixed(2)}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          
          <button 
            onClick={makePayment} 
            className='w-full px-4 py-2 mt-4 text-sm font-semibold text-white transition-colors duration-200 bg-orange-500 rounded-lg hover:bg-orange-600 active:bg-orange-700 sm:py-3 sm:px-6 sm:mt-6 sm:text-base touch-manipulation'
          >
            PLACE ORDER (${total.toFixed(2)})
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default Checkout