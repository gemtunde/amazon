const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const ReviewSchema = new Schema({
        productID : {type : Schema.Types.ObjectId, ref : "Product" },
        user : {type: Schema.Types.ObjectId, ref : "User"},
        headline: String,
        body : String,
        rating: Number,
        photo: String,
});

module.exports = mongoose.model("Review", ReviewSchema);













