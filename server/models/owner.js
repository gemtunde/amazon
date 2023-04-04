const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const OwnerSchema = new Schema({
        name: String,
        description: String,
        photo: String,
});

module.exports = mongoose.model("Owner", OwnerSchema);













