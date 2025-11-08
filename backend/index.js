let express = require("express");
let app = express();
require("dotenv").config;
let cors = require("cors");
const { mongodb } = require("./database");
const { userRouter } = require("./routes/userRoutes");
const { productRouter } = require("./routes/productRoutes");
const { webhook } = require("./controllers/userController");
let PORT = process.env.PORT || 4000;

app.use(cors());

mongodb();

app.get("/",(req,res)=>{
res.send("Express server is running")
});

app.post("/webhook",express.raw({type:"application/json"}),webhook);

app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/product",productRouter);

app.listen(PORT,()=>{
    console.log(`Express server is running on port ${PORT}`);
});

