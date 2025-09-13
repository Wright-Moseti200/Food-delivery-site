let multer = require("multer");
let express = require("express");
let path = require("path");
let app = express();
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./folder/images");   
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

let upload = multer({storage:storage});
app.use("/images",express.static("./folder/images"));

module.exports={upload};