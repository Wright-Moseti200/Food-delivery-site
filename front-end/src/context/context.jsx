/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React,{useEffect,useState,createContext} from 'react'
import { food_list } from '../assets/assets'

  let defaultCart = ()=>{
        let cart={};
        for(let i=1;i<=food_list.length;i++){
            cart[i]=0;
        }
        return cart
    } 

    export const FoodContext = createContext();

const Context = ({children}) => {

    let [cart,setCart]=useState(defaultCart);

    let addToCart = (id)=>{
        setCart((data)=>{
            let copyData = {...data};
            copyData[id]+=1
            return copyData;
        });
    }

    let removeFromCart = (id)=>{
        setCart((data)=>{
            let copyData = {...data};
            copyData[id]-=1
            return copyData;
        });
    }

   let getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(let items in cart){ 
        if(cart[items] > 0){
            let product = food_list.find((element) => {
                return element._id === items;  
            });
            if(product){
                totalAmount += product.price * cart[items];
            }
        }
    }
    return totalAmount;
}


    let values = {addToCart,removeFromCart,getTotalCartAmount,cart};

  return(
    <>
    <FoodContext.Provider value={values}>
        {children}
    </FoodContext.Provider>
    </>
  )
}

export default Context;
