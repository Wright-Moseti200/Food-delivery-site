let mongoose = require("mongoose");
let orderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    products:{
        type:Array,
        required:true
    },
    names:{
        type:String,
        required:true
    },
    delivery_info:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Food processing"
    }
});

let orderModel = mongoose.model("Order",orderSchema);
module.exports = {orderModel}