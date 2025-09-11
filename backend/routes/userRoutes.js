const express = require("express");
const { signup, signin, getcartdata } = require("../controllers/userController");

const UserRouter = express.Router();

UserRouter.post("/signup", signup);
UserRouter.post("/signin", signin);
UserRouter.get("/getcartdata", getcartdata);

module.exports = { UserRouter };