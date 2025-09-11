let mongose = require("mongoose");
require ("dotenv").config();

let mongodb =  async()=>{
    try{
        await mongose.connect(`${process.env.MONGODB_URL}/foodsite`);
        console.log("Database has been connected successfully");
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports={mongodb};