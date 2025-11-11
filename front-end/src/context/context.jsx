/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React,{useEffect,useState,createContext} from 'react'

 export const FoodContext = createContext();

 let defaultCart = ()=>{
    let cart = {}
    for(let i;i<=300+1;i++){
        cart[i]=0;
    }
    return cart;
 }
  
const Context = ({children}) => {
    let [cart,setDefaultCart]=useState();

    let getcartData = async ()=>{
         const token = localStorage.getItem("auth-token");
       await fetch('https://food-delivery-site-ljqp.onrender.com/api/users/getcartdata',{
        method:"get",
        headers:{
            "Content-Type":"application/json",
            "auth-token":token
        }})
       .then((response)=>response.json())
       .then((data)=>setDefaultCart(data.cart)).catch((error)=>console.log(error.message));
    }

    useEffect(()=>{
        getcartData();
    },[cart]);

    let addToCart= async(elementId)=>{
         await fetch('https://food-delivery-site-ljqp.onrender.com/api/users/addtocart',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("auth-token")
            },
            body:JSON.stringify({id:elementId})
         })
       .then((response)=>response.json())
       .then((data)=>console.log(data.message)).catch((error)=>console.log(error.message));
    }

    let removeFromCart = async(elementId)=>{
         await fetch('https://food-delivery-site-ljqp.onrender.com/api/users/removefromcart',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("auth-token")
            },
            body:JSON.stringify({id:elementId})
         })
       .then((response)=>response.json())
       .then((data)=>console.log(data.message)).catch((error)=>console.log(error.message));
    }


    let values = {cart,defaultCart,addToCart,removeFromCart};

  return(
    <>
    <FoodContext.Provider value={values}>
        {children}
    </FoodContext.Provider>
    </>
  )
}

export default Context;
