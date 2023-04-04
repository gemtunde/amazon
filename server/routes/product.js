 const router = require('express').Router();
 const Product = require("../models/product")


//POST request ---create a new product
    router.post("/products", async (req, res)=> {
        try{
            let product = new Product();
                product.title = req.body.title ;
                product.description = req.body.description ;
                product.price = req.body.price ;
                product.stockQuantity = req.body.stockQuantity ;
                product.photo = req.body.photo ;

                await product.save();
                res.json({
                    status: true,
                    message: "successfully save"
                })
        }
        catch(err){
            res.status(500).status({
                status : false,
                message : err.message
            })
        }
    });    
    module.exports = router;


//GET request - get all product


//GET request -- get a single product




//PUT request -- update a single product



//DELETE request -  delete a single product

