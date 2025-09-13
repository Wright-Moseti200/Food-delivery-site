const { Product } = require("../models/productModel");


let uploadImage = (req,res)=>{
    try{
        if(!req.file){
        return res.status(400).json({
            success:false,
            message:"No files were added"
            });
        }
 return res.status(200).json({
    success:true,
    image_url:`/images/${req.file.filename}`
});
}
catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
}

let receiveProductData =async (req,res)=>{
    try{
        let id;
        let product = Product.findOne({});
        if(product.length > 0){
            let last_Product_array = product.slice(-1);
            let last_Product = last_Product_array[0];
            id=last_Product.id+1
        }
        else{
            id = 1
        }
        let productData = new Product({
            id:id,
            name:req.body.name,
            image_url:req.body.image_url,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category
        });

        let savedProductData = await productData.save();

        if(!savedProductData){
         return  res.status(404).json({
                success:false,
                message:"Product is not saved"
            });
        }

      return res.status(201).json({
        success:true,
        message:"Product saved successfully"
        });
    }
    catch(error){
     return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

let sendProductData = async (req,res)=>{
    try{
        let products = await Product.findOne({});
       return res.status(200).json({
        success:true,
        products:products
       });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={receiveProductData,sendProductData,uploadImage};