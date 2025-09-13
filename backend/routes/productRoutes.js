let express = require("express");
const { upload } = require("../middlewares/uploadMiddleware");
const { uploadImage,receiveProductData,sendProductData} = require("../controllers/productController");
let productRouter = express.Router();

productRouter.post("/upload",upload.single("product"),uploadImage);
productRouter.post("/receiveProductData",receiveProductData);
productRouter.get("/sendProductData",sendProductData);


module.exports={productRouter};