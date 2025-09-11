let express = require('express');
let cors = require("cors");
let app = express();
let port = 4000
let {mongodb} = require("./database");
const { UserRouter } = require('./routes/userRoutes');

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Express server is running");
});


app.use("/api/user",UserRouter);

mongodb();

app.listen(port,()=>{
    console.log(`express server is running on port ${port}`)
});
