let express = require('express');
let cors = require("cors");
let app = express();
let port = 4000

app.use(cors());

app.get('/',(req,res)=>{
    res.send("Express server is running");
});

app.listen(port,()=>{
    console.log(`express server is running on port ${port}`)
})