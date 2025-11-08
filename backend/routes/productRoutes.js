let express = require("express");
const { upload } = require("../middlewares/uploadMiddleware");
const { uploadImage,receiveProductData,sendProductData, getusersorders, updateorders} = require("../controllers/productController");
let productRouter = express.Router();

productRouter.post("/upload",upload.single("product"),uploadImage);
productRouter.post("/receiveProductData",receiveProductData);
productRouter.get("/sendProductData",sendProductData);
productRouter.get("/getusersorders",getusersorders);
productRouter.put("/updateorderstatus",updateorders)


module.exports={productRouter};