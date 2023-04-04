const router = require("express").Router();
const Category = require("../models/category");


//POST request -create new categories
  router.post("/categories", async(req, res) => {
    try {
        let category = new Category();
        category.type = req.body.type

       await category.save();
        res.json({
            success: true,
            message: "category created successfully"

        });

    } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message

        });
    }
  });

  
  //GET request -get all categories
    router.get("/categories",async (req, res) => {
        try{
            let categories =await Category.find();

            res.status(200).json({
                success : true,
                message : categories
            })
        }
        catch (err){
            
            res.status(500).json({
                success : false,
                message : err.message
            })
        }
    });
  //GET request -get a single categories
    router.get("/categories/:id",async (req, res) => {
        try{
            let category =await Category.findOne({_id : req.params.id});

            res.status(200).json({
                success : true,
                message : category
            })
        }
        catch (err){
            
            res.status(500).json({
                success : false,
                message : err.message
            })
        }
    });
  
  //PUT request - update a single categories
   router.put("/categories/:id", async (req, res) => {
       try {
         let category = await Category.findOneAndUpdate(
            {_id : req.params.id}, 
           { 
            $set : {
                type: req.body.type,
            }
        },
        {upsert: true}
            );

        res.status(200).json({
             success : true,
               updatedCategory : category
        })
       } catch (err) {
         res.status(500).status({
                status : false,
                message : err.message
            })
       }
    })
    
  //DELETE request - delete a single categories
    router.delete("/categories/:id", async (req, res) => {
       try {
         let categoryDeleted = await Category.findOneAndDelete({_id : req.params.id});
        if(categoryDeleted){
             res.status(200).json({
             success : true,
                message : "Product deleted successfully"
        })
        }
       
       } catch (err) {
         res.status(500).status({
                status : false,
                message : err.message
            })
       }
    });
  module.exports = router;
