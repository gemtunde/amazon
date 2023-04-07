  const router = require("express").Router();
  const Owner = require("../models/owner");
  
  
  //POST request -create a new owner
        // name: String,
        // description: String,
        // photo: String,

  router.post("/owners", async (req, res) => {
        try{
            let owner = new Owner();
            owner.name = req.body.name
            owner.description = req.body.description
            owner.photo = req.body.photo

           await owner.save();
            res.status(200).json({
                success : true,
                owner: "Owner successfully created"
            });

        }
        catch(err){
             res.status(500).json({
                success : false,
                message: err.message
            })
        }
  });

  //GET request -get all owners

    router.get("/owners", async (req, res) => {
        try{
            let owners = await Owner.find();

            res.status(200).json({
                success : true,
              owners: owners
            })
        }
        catch(err){
             res.status(500).json({
                success : false,
                message: err.message
            })
        }
    })

  //GET request -get a single owner
   router.get("/owners/:id", async (req, res) => {
        try{
            let owner = await Owner.findOne({_id : req.params.id});

            res.status(200).json({
                success : true,
                owner: owner
            })
        }
        catch(err){
             res.status(500).json({
                success : false,
                message: err.message
            })
        }
    });
  
  //PUT request - update a single owner
    router.put("/owners/:id", async (req, res) => {
       try {
         let owner = await Owner.findOneAndUpdate(
            {_id : req.params.id}, 
           { 
            $set : {
                name: req.body.name,
                 description: req.body.description,
                photo : req.body.photo
            }
        },
        {upsert: true}
            );

        res.status(200).json({
             success : true,
               updatedOwner : owner
        })
       } catch (err) {
         res.status(500).status({
                status : false,
                message : err.message
            })
       }
    })
  
  //DELETE request - delete a single owner
        router.delete("/owners/:id", async (req, res) => {
       try {
         let ownerDeleted = await Owner.findOneAndDelete({_id : req.params.id});
        if(ownerDeleted){
             res.status(200).json({
             success : true,
                DeletedOwner : "Product deleted successfully"
        })
        }
       
       } catch (err) {
         res.status(500).status({
                status : false,
                message : err.message
            })
       }
    });

  module.exports = router ;