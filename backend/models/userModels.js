let mongoose = require("mongoose");
let userSchema = mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        required:true
    }
});

let Users = mongoose.model("User",userSchema);
module.exports={Users};