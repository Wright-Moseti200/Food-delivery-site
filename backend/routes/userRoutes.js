let express = require("express");
const { signup } = require("../controllers/userController");
let UserRouter = express.Router();

UserRouter.post("/signup",signup);

module.exports={UserRouter};