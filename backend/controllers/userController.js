let {Users} = require("../models/userModels");
let express = require("express");
let app = express();
let {v4:uuidv4} = require("uuid");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
require("dotenv").config();

let signup =async (req,res)=> {
    try{
    let email = await Users.findOne({email:req.body.email})
    if(email){
     return res.status(400).json({
            success:false,
            message:"user already exists"
        });
    }

    let password = bcrypt.hash(req.body.password,process.env.HASH_PASS);

   let newUsers = await new Users({
        _id:uuidv4(),
        username:req.body.username,
        email:req.body.email,
        password:password
    });

    let savedUser = newUsers.save();

    let data = {
        user:{
            id:savedUser._id
        }
    }

    let token = jwt.sign(data,process.env.JWT_PASS);
   return res.status(200).json({
        message:"User Signed up successfully",
        token:token
    });
}
catch(error){
return res.json({
    message:error.message
})
}
};

app.post("/signin",async (req,res)=>{

});

app.get("/getcartdata",(req,res)=>{

});

module.exports={signup};