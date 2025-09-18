/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useState,useEffect,useContext} from 'react'
import { assets , menu_list, food_list } from '../assets/assets';
import {FoodContext} from "../context/context"
import "./home.css";

const Home = () => {
  let [menuItem,selectMenuitem]=useState("");
  let [data,setData]=useState([]);
  let [foodList,setfoodlist]=useState([]);
  let {addToCart,removeFromCart,cart}=useContext(FoodContext);
 
  let menuSelect = async (e,index)=>{
    // Remove animation from all menu items first
    const allMenuImages = document.querySelectorAll('.menu-item');
    allMenuImages.forEach(img => img.classList.remove('animation'));
    
    // Convert e.target.alt to number for comparison, or use string comparison
   if(parseInt(e.target.alt) === index){
      e.target.classList.add("animation");
      selectMenuitem(menu_list[index].menu_name);
    }
  }

  let apiCall =async()=>{
    try{
      let response = await fetch('http://localhost:3000/api/product/sendProductData');
      let data = await response.json();
      setData(data.products);
    }
    catch(error){
      alert(error.message);
    }
  }

  useEffect(()=>{
    apiCall();
    if(menuItem) {
      let updated=data.filter((element,index)=>{
        return ( element.category===menuItem);
      });
      setfoodlist(updated);
    } 
    else{
      setfoodlist(data);
    }
  },[data]);

  return (
    <>
    <div className='flex flex-col items-center mt-4 sm:mt-8 px-4 sm:px-6 lg:px-8'>
      
      {/* Hero Section */}
      <div 
        style={{backgroundImage:`url(${assets.header_img})`}} 
        className='w-full max-w-7xl bg-center bg-cover h-64 sm:h-80 lg:h-[510px] p-6 sm:p-12 lg:p-20 flex flex-col justify-center rounded-lg'
      >
        <h1 className='text-white font-bold text-2xl sm:text-4xl lg:text-7xl w-full max-w-xs sm:max-w-md lg:max-w-[690px] leading-tight sm:leading-snug'>
          Order your favourite food here
        </h1>
        <p className='text-white mt-3 sm:mt-5 w-full max-w-xs sm:max-w-md lg:max-w-[690px] text-sm sm:text-base lg:text-base'>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest
          ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your 
          dining experience, one delicious meal at a time        
        </p>
        <button className='w-24 sm:w-28 mt-4 sm:mt-6 lg:mt-8 text-neutral-500 p-2 sm:p-3 rounded-full bg-white text-sm sm:text-base hover:bg-gray-100 transition-colors'>
          View menu
        </button>
      </div>

      {/* Menu Section Header */}
      <div className='w-full max-w-7xl mt-4 sm:mt-5'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center lg:text-left'>Explore our menu</h1>
        <p className='mt-3 sm:mt-5 text-neutral-600 w-full max-w-xs sm:max-w-md lg:max-w-[695px] text-sm sm:text-base text-center lg:text-left mx-auto lg:mx-0'>
          Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your
          cravings and elevate your dining experience, one delicious meal at a time
        </p>
      </div>

      {/* Menu Categories */}
      <div className='mt-6 sm:mt-8 lg:mt-11 w-full max-w-7xl'>
        {/* "All" option */}
        <div className='flex flex-wrap justify-center lg:justify-between gap-4 sm:gap-6 lg:gap-8'>
          <div className='flex cursor-pointer flex-col items-center'>
            <div 
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-[100px] lg:w-[100px] rounded-full menu-item bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors" 
              onClick={() => {
                const allMenuImages = document.querySelectorAll('.menu-item');
                allMenuImages.forEach(img => img.classList.remove('animation'));
                selectMenuitem("");
              }}
            >
              <span className="text-xs sm:text-sm lg:text-base font-bold text-gray-600">All</span>
            </div>
            <p className='text-center text-xs sm:text-sm lg:text-base mt-1 text-neutral-600'>All Items</p>
          </div>

          {menu_list.map((element,index)=>{
            return (
              <div key={index} className='flex cursor-pointer flex-col items-center'>
                <img 
                  className="h-16 w-16 sm:h-20 sm:w-20 lg:h-[100px] lg:w-[100px] rounded-full menu-item hover:scale-105 transition-transform" 
                  onClick={(e)=>{menuSelect(e,index)}} 
                  src={element.menu_image} 
                  alt={index}
                />
                <p className='text-center text-xs sm:text-sm lg:text-base mt-1 text-neutral-600'>{element.menu_name}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div className='border-b-2 border-neutral-300 mt-6 sm:mt-8 lg:mt-10 w-full max-w-7xl'/>

      {/* Food Items Section */}
      <div className='mt-6 sm:mt-8 lg:mt-9 w-full max-w-7xl'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center lg:text-left mb-4 sm:mb-5'>Top dishes near you</h1>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7'> 
          {foodList.map((element,index) => (
            <div
              key={ index}
              className='bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow'
            >
              <div
                className='h-48 sm:h-52 lg:h-60 bg-cover bg-center flex items-end justify-end p-3'
                style={{ backgroundImage: `url(${element.image_url})`, backgroundPosition: 'center' }}
              >
                {cart[element._id]>0?
                <div className='flex justify-center items-center bg-white rounded-3xl shadow-md'>
                  <img
                    src={assets.add_icon_green}
                    alt="add"
                    className='h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full cursor-pointer p-1 hover:scale-110 transition-transform'
                    onClick={()=>{addToCart(element._id)}}
                  />
                  <p className='px-2 text-sm sm:text-base font-semibold'>{cart[element._id]}</p>
                  <img
                    src={assets.remove_icon_red}
                    alt="remove"
                    className='h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full cursor-pointer p-1 hover:scale-110 transition-transform'
                    onClick={()=>{removeFromCart(element._id)}}
                  />
                </div>
                :
                <img
                  src={assets.add_icon_white}
                  alt="add"
                  className='h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full cursor-pointer p-1 hover:scale-110 transition-transform shadow-md'
                  onClick={()=>{addToCart(element._id)}}
                />
                }
              </div>

              <div className='p-3 sm:p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='text-base sm:text-lg font-bold text-neutral-800 line-clamp-1'>{element.name}</p>
                    <img src={assets.rating_starts} alt="rating" className='h-3 sm:h-4' />
                  </div>
                </div>
                <p className='mt-2 text-xs sm:text-sm text-neutral-600 line-clamp-2'>{element.description}</p>
                <p className='text-lg sm:text-xl font-bold mt-2 text-orange-500'>${element.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;