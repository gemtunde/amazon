const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const Product = require("../models/product");
const Review = require("../models/review");

router.post("/reviews/:productID", verifyToken, async (req, res) => {
    try {
        let review = new Review();

        review.headline = req.body.headline ;
        review.body = req.body.body ;
        review.rating = req.body.rating;
        review.photo = req.body.photo;
        review.productID = req.params.productID;
        review.user = req.decoded._id;

        await Product.update({$push : review_id});

        const saveReview = await review.save();

        if(saveReview ){
        res.json({
            success: true,
            message : "Successfully Added Review"
        })
    }


        
    } catch (error) {
         res.status(500).status({
                status : false,
                message : error.message
            })
    }
});


//get reviews 
router.get("/reviews/:productID", async (req, res) => {
    try {
        let reviewsFound = await Review.findOne({_id : req.params.productID})
        //.populate("User")
        //.exec();

        res.json({
            success : true,
            reviews : reviewsFound
        })
    } catch (error) {
          res.status(500).status({
                status : false,
                message : error.message
            })
    }
})
 module.exports = router;