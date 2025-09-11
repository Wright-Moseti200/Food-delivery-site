const { Users } = require("../models/userModels"); // Remove extra express imports
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signup = async (req, res) => {
    try {
        
        const existingUser = await Users.findOne({ email: req.body.email });
        
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const saltRounds = parseInt(process.env.HASH_PASS) || 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        
        const newUser = new Users({
            _id: uuidv4(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: {}
        });

        const savedUser = await newUser.save();

        const tokenData = {
            user: {
                id: savedUser._id
            }
        };

        const token = jwt.sign(tokenData, process.env.JWT_PASS, {
            expiresIn: '1d'
        });

        res.status(201).json({
            success: true,
            message: "User signed up successfully",
            token: token,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const signin = async (req, res) => {
    res.json({ message: "Signin endpoint" });
};

const getcartdata = (req, res) => {
    res.json({ message: "Get cart data endpoint" });
};

module.exports = { signup, signin, getcartdata };