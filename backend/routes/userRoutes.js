let express = require("express");
const { signUp, signIn, } = require("../controllers/userController");
let userRouter = express.Router();

userRouter.post("/signUp",signUp);
userRouter.post("/signIn",signIn);

module.exports={userRouter};