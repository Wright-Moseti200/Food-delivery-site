let express = require("express");
let app = express();
require("dotenv").config;
let cors = require("cors");
const { mongodb } = require("./database");
const { userRouter } = require("./routes/userRoutes");
const { signIn } = require("./controllers/userController");
let PORT = process.env.PORT || 4000;

app.use(cors());

mongodb();

app.get("/",(req,res)=>{
res.send("Express server is running")
});

app.use(express.json());
app.use("/api/users",userRouter);

app.listen(PORT,()=>{
    console.log(`Express server is running on port ${PORT}`);
});

