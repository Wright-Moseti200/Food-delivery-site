const multer = require("multer");
const path = require("path");
let cloudinary =  require("cloudinary").v2;
let {CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:"dvexzhis9",
    api_key:357754644141572,
    api_secret:"W8QHODGRKexhcSpUXCfaHD6aVh4"
});

let storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"Food delivery Site",
        allowed_formats:['jpg', 'jpeg', 'png', 'gif']
    }
})

const upload = multer({ storage: storage });

module.exports = { upload };
