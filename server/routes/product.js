 const router = require('express').Router();
 const Product = require("../models/product")


//POST request ---create a new product
    router.post("/products", async (req, res)=> {
        try{
            let product = new Product();
                product.ownerID = req.body.ownerID ;
                product.categoryID = req.body.categoryID ;
                product.title = req.body.title ;
                product.description = req.body.description ;
                product.price = req.body.price ;
                product.stockQuantity = req.body.stockQuantity ;
                product.photo = req.body.photo ;

                await product.save();
                res.json({
                    status: true,
                    product: "successfully save"
                })
        }
        catch(err){
            res.status(500).status({
                status : false,
                message : err.message
            })
        }
    });    
    
    
    //GET request - get all product
    router.get("/products", async (req, res) => {
        try{
            const products = await Product.find();
             //.populate('owner category').exec();

            res.status(200).json({
                success : true,
                products : products
            })
        }
        catch(err){
             res.status(500).status({
                status : false,
                message : err.message
            })
        }
    })
    
    //GET request -- get a single product
    router.get("/products/:id", async (req, res) => {
       try {
         let product = await Product.findOne({_id : req.params.id})//.populate("owner category").exec();
         //.populate('owner category').exec();

        res.status(200).json({
             success : true,
                product : product
        })
       } catch (err) {
         res.status(500).status({
                status : false,
                message : err.message
            })
       }
    })
    
    
    
    
    //PUT request -- update a single product
        router.put("/products/:id", async (req, res) => {
       try {
         let product = await Product.findOneAndUpdate(
            {_id : req.params.id}, 
           { 
            $set : {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                stockQuantity: req.body.stockQuantity,
                photo: req.body.photo,
                owner: req.body.OwnerID,
                category: req.body.categoryID,
            }
        },
        {upsert: true}
            );

        res.status(200).json({
             success : true,
               updatedProduct : product
        })
       } catch (err) {
         res.status(500).status({
                status : false,
                message : err.message
            })
       }
    })
    
    
    //DELETE request -  delete a single product
    router.delete("/products/:id", async (req, res) => {
       try {
         let productDeleted = await Product.findOneAndDelete({_id : req.params.id});
        if(productDeleted){
             res.status(200).json({
             success : true,
                product : "Product deleted successfully"
        })
        }
       
       } catch (err) {
         res.status(500).status({
                status : false,
                message : err.message
            })
       }
    })
    module.exports = router;