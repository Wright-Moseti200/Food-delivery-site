import React,{useState} from 'react';

const AddProduct = () => {
  let [image,setImageHandler]=useState();

  let [formData,setFormData]=useState({
     name:"",
     image_url:"",
     price:"",
     description:"",
     category:"salad"
  });
  
  let imageHandler = (e)=>{
    setImageHandler(e.target.files[0]);
  }
  let addproduct = async (e)=>{
    e.preventDefault();
    let responseData;
    let formData1 = new FormData();
    formData1.append("product",image);
    await fetch("http://localhost:3000/api/product/upload",{
      method:"post",
      body:formData1
    }).then((response)=>response.json()).then((data)=>responseData=data).catch((error)=>console.log(error.message));
    if(responseData.success){
      formData.image_url=responseData.image_url;
       await fetch("http://localhost:3000/api/product/receiveProductData",{
        method:"post",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
      }).then((response)=>response.json()).then((data)=>alert(data.message)).catch((error)=>console.log(error.message));
    }
    setImageHandler("");
    formData.name="";
    formData.price="";
  }

  let formhandler = (e)=>{
    setFormData((data)=>{
      let setdata = {...data};
      setdata[e.target.name]=e.target.value;
      return setdata;
    });
  }

  return (
    <div className='flex w-full justify-center items-start py-4 sm:py-8'>
      <div className='flex flex-col mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 w-full max-w-2xl mx-auto'>
          <h1 className='font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center lg:text-left'>Add New Product</h1>
          <form className='flex flex-col gap-3 sm:gap-4' onSubmit={addproduct}>
            <input 
              type='text' 
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base' 
              name="name"
              placeholder='Product Name'
               onChange={formhandler}
              value={formData.name}
            />
            <div className='flex items-center justify-center w-full'>
              {
                image?<img className='h-40 w-full' src={URL.createObjectURL(image)}/>:
              <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg className='w-8 h-8 mb-4 text-gray-500' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 16'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'/>
                  </svg>
                  <p className='mb-2 text-sm text-gray-500'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
                  <p className='text-xs text-gray-500'>SVG, PNG, JPG (MAX. 5MB)</p>
                   
                </div>
                <input type='file' onChange={imageHandler} className='hidden' />
              </label>
            }
            </div>
            <input 
              type='number' 
              min='0' 
              step='0.01'
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base' 
              placeholder='Price ($)'
              name='price'
               onChange={formhandler}
              value={formData.price}
            />
            <select 
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base bg-white'
              name='category'
               onChange={formhandler}
              value={formData.category}
            >
              <option value='' disabled selected>Select Category</option>
              <option value='salad'>Salad</option>
              <option value='rolls'>Rolls</option>
              <option value='deserts'>Desserts</option>
              <option value='sandwich'>Sandwich</option>
              <option value='cake'>Cake</option>
              <option value='pure veg'>Pure Veg</option>
              <option value='pasta'>Pasta</option>
            </select>
            <textarea 
              rows='4'
              className='border-[1px] border-neutral-300 rounded-sm p-2 sm:p-3 outline-none focus:border-orange-500 text-sm sm:text-base' 
              placeholder='Product Description'
              name="description"
              onChange={formhandler}
              value={formData.description}
            ></textarea>
            <button 
              type='submit'
              className='bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-colors duration-200 py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-white font-semibold mt-4 w-full text-sm sm:text-base touch-manipulation'
            >
              ADD PRODUCT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;