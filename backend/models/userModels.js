let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    unique:true,
    trim:true,
    lowercase:true,
    required:true
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
module.exports = {Users};