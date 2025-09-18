import React, { useEffect, useState } from 'react';

const ListProduct = () => {
  let [products,setproducts]=useState([]);

  let apiCall =async()=>{
    try{
      let response = await fetch("http://localhost:3000/api/product/sendProductData");
      let data = await response.json();
      setproducts(data.products);
    }
    catch(error){
      console.log(error.message);
    }
  }

  useEffect(()=>{
    apiCall();
  },[products])

  return (
    <div className='flex w-full justify-center items-start py-4 sm:py-8'>
      <div className='flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 w-full'>
          <h1 className='font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center lg:text-left'>Product List</h1>
                               
          <div className='flex flex-col gap-4 sm:gap-6'>
            {products.map((product,index) => (
              <div key={index} className='border border-gray-200 rounded p-4 sm:p-6'>
                <div className='flex flex-col md:flex-row gap-6'>
                  {/* Updated image section */}
                  <div className='w-full md:w-32 h-32 flex-shrink-0'>
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className='w-full h-full object-cover rounded-xl border-2 border-gray-200'
                    />
                  </div>
                                               
                  <div className='flex-1'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3'>
                      <div>
                        <h3 className='font-bold text-lg text-gray-800'>{product.name}</h3>
                        <p className='text-orange-500 font-semibold mt-1'>${product.price}</p>
                      </div>
                                                           
                      <div className='flex gap-2'>
                        <button className='py-2 px-4 bg-blue-100 text-blue-700 rounded font-medium hover:bg-blue-200 transition-colors text-sm'>
                          Edit
                        </button>
                        <button className='py-2 px-4 bg-red-100 text-red-700 rounded font-medium hover:bg-red-200 transition-colors text-sm'>
                          Delete
                        </button>
                      </div>
                    </div>
                                                     
                    <div className='mt-3'>
                      <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'>
                        {product.category}
                      </span>
                    </div>
                                                     
                    <p className='mt-3 text-gray-600 text-sm sm:text-base'>{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;