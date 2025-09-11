let express = require("express");
require("dotenv").config();
let bcrypt = require("bcrypt");
let jwt =  require("jsonwebtoken");
let {Users} = require("../models/userModels");
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

    let userData = new Users({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
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
return res.status(400).json({
    success:false,
    message:error.message
})
}
}
//Sign in
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
        res.status(400).json({

        });
    }
}

let getCartData = (req,res)=>{

}

module.exports = {signUp,signIn,getCartData};