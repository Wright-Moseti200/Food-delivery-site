let express = require("express");
require("dotenv").config();
let bcrypt = require("bcrypt");
let jwt =  require("jsonwebtoken");
let {Users} = require("../models/userModels");
let stripe = require("stripe")(process.env.STRIPE_SECRET);

//Signup
let signUp = async (req,res)=>{
    try{

    let user = await Users.findOne({email:req.body.email});
    if(user){
     return  res.status(400).json({
            success:false,
            message:"User already exist"
        });
    }
    let hashedPassword = await bcrypt.hash(req.body.password,parseInt(process.env.HASH_PAS));
    let cart = {};
    for(let i=1;i<=300+1;i++){
        cart[i]=0;
    }

    let userData = new Users({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
        cartData:cart
    });

    let savedUser = await userData.save();

    let data = {user:{
        id:savedUser._id
    }}

    let token = jwt.sign(data,process.env.JWT_PAS);

   return res.status(201).json({
        success:true,
        token:token
    });

}
catch(error){
return res.status(500).json({
    success:false,
    message:error.message
})
}
}

//Signin
let signIn = async (req,res)=>{
    try{
let email = await Users.findOne({email:req.body.email});
if(!email){
return res.status(404).json({
    success:false,
    message:"User does not exist"
});
}
let password = await bcrypt.compare(req.body.password,email.password);
if(!password){
   return res.status(401).json(
        {
            success:false,
            message:"Password is incorrect"
        }
    );
}
let data = {user:{
    id:email._id
}};

let token=jwt.sign(data,process.env.JWT_PAS);

return res.status(200).json({
    success:true,
    token:token
});
    }
    catch(error){
        res.status(500).json({
            success:false,
    message:error.message
});
    }
}

//getcartdata
let getCartData =async (req,res)=>{
    try{
        let user = await Users.findOne({_id:req.user.id});
        res.status(200).json({
            success:true,
            cart:user.cartData
        });
    }
    catch(error){
         res.status(500).json({
            success:false,
    message:error.message
});
    }
}

//add to cart
let addToCart = async (req,res)=>{
    try{
     let userData = await Users.findOne({_id:req.user.id});
     userData.cartData[req.body.id]+=1;
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData}); 
     res.status(200).json({
        success:true,
        message:"Cart Updated"
     });
    }
    catch(error){
      return  res.status(500).json({
            success:false,
    message:error.message,
});
    }
}

//remove from cart
let removeFromCart = async (req,res)=>{
try{
      let userData = await Users.findOne({_id:req.user.id});
     userData.cartData[req.body.id]-=1;
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData}); 
     res.status(200).json({
        success:true,
        message:"Cart Updated"
     });
}
catch(error){
   return res.status(500).json({
            success:false,
    message:error.message
});
}
}

//Payment integration
let payment = async(req,res)=>{
    try {
        const { cart, deliveryInfo, totalAmount, foodItems } = req.body;
        
        // Validate required data
        if (!cart || !foodItems || foodItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart data is required"
            });
        }

        // Create line items for Stripe
        const lineItems = foodItems.map((element) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: element.name,
                    images: [element.image_url] // Match your frontend property name
                },
                unit_amount: Math.round(element.price * 100) // Convert to cents
            },
            quantity: cart[element.id] // Get quantity from cart
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success", // Your frontend success URL
            cancel_url: "http://localhost:5173/cart",     // Your frontend cancel URL
            customer_email: deliveryInfo.email, // Pre-fill email
            metadata: {
                delivery_address: JSON.stringify(deliveryInfo)
            }
        });

        res.status(200).json({ 
            success: true,
            id: session.id 
        });
        
    } catch (error) {
        console.error('Stripe payment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {signUp,signIn,getCartData,addToCart,removeFromCart,payment};