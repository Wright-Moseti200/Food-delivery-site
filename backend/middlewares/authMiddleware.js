let jwt = require("jsonwebtoken");
require("dotenv").config();
let authMiddleware = (req,res,next)=>{
    try{
    let token = req.header("auth-token");
    if(!token){
        res.status(404).json({
            success:false,
            token:"Token is not available"
        });
    }
      let data = jwt.verify(token,process.env.JWT_PAS);
        req.user = data.user
        next();
    }
    catch(error){
         res.status(500).json({
            success:false,
            message:error.message
    });
    }
}

module.exports ={authMiddleware};