let express = require("express");
const { signUp, signIn, addToCart,getCartData,removeFromCart,payment} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
let userRouter = express.Router();

userRouter.post("/signUp",signUp);
userRouter.post("/signIn",signIn);
userRouter.post("/addtocart",authMiddleware,addToCart);
userRouter.post("/removefromcart",authMiddleware,removeFromCart);
userRouter.get("/getcartdata",authMiddleware,getCartData);
userRouter.post("/create-checkout-session",payment);

module.exports={userRouter};