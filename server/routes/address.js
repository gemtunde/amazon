const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const Address = require("../models/address");
const axios = require("axios");

//POST request -create new Address
  router.post("/addresses", verifyToken, async(req, res) => {
    try {
        let address = new Address();
        
       address.user = req.decoded._id,
       address.country = req.body.country,
       address.fullName = req.body.fullName,
       address.streetAddress = req.body.streetAddress,
       address.city = req.body.city,
       address.state = req.body.state,
       address.zipCode = req.body.zipCode,
       address.phoneNumber = req.body.phoneNumber,
       address.deliverInstructions = req.body.deliverInstructions,
       address.securityCode = req.body.securityCode,

       await address.save();
        res.json({
            success: true,
            message: "address created successfully"

        });

    } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message

        });
    }
  });
  
  //get address api
  router.get("/addresses", verifyToken, async (req,res) => {

        try {
            let addresses = await Address.find({_id : req.decoded._id});

            res.json({
                success : true,
                addresses : addresses
            })
            
        } catch (error) {
            res.status(500).json({
            success: false,
            message: error.message

        });
        }
  });

  //get all countries
  router.get("/countries", async(req, res) => {
    try {
        let response = await axios.get("https://restcountries.com/v3.1/all");

        res.json(response.data);
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message
    })
}
  })
  module.exports = router ;