let express = require("express");
let app = express();
require("dotenv").config;
let cors = require("cors");
const path = require("path");
const { mongodb } = require("./database");
const { userRouter } = require("./routes/userRoutes");
const { productRouter } = require("./routes/productRoutes");
let PORT = process.env.PORT || 4000;

app.use(cors());

mongodb();

app.get("/",(req,res)=>{
res.send("Express server is running")
});

app.use(express.json());
app.use("/images",express.static(path.join(__dirname, "folder/images")));
app.use("/api/users",userRouter);
app.use("/api/product",productRouter);

app.listen(PORT,()=>{
    console.log(`Express server is running on port ${PORT}`);
});

