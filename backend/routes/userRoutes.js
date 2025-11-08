let express = require("express");
const { signUp, signIn, addToCart,getCartData,removeFromCart,payment, credentials,getuserorders} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
let userRouter = express.Router();

userRouter.post("/signUp",signUp);
userRouter.post("/signIn",signIn);
userRouter.put("/addtocart",authMiddleware,addToCart);
userRouter.put("/removefromcart",authMiddleware,removeFromCart);
userRouter.get("/getcartdata",authMiddleware,getCartData);
userRouter.post("/create-checkout-session",payment);
userRouter.get("/getcredentials",authMiddleware,credentials);
userRouter.get("/getuserorders",authMiddleware,getuserorders);

module.exports={userRouter};