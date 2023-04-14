const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//models
const User = require("./models/user")

//loads env files
dotenv.config();

const app = express();

//db conection
// mongoose.connect(
//     "mongodb+srv://gemtunde:JJ5j5hH8NCzHq2fc@amazon.kuvx1hb.mongodb.net/?retryWrites=true&w=majority",
// {useNewUrlParser: true, useUnifiedTopology : true},
// err=> {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("connected to db")
//     }
// });

mongoose
     .connect( process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

//midddleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//require product apis
const productRoutes = require("./routes/product");
app.use("/api", productRoutes);

//require category apis
const categoryRoutes = require("./routes/category");
app.use("/api", categoryRoutes);

//require category apis
const ownerRoutes = require("./routes/owner");
app.use("/api", ownerRoutes);

//require user apis
const userRoutes = require("./routes/auth");
app.use("/api", userRoutes);

//require reviews apis
const reviewRoutes = require("./routes/review");
app.use("/api", reviewRoutes);

//require address apis
const addressRoutes = require("./routes/address");
app.use("/api", addressRoutes);


//port
app.listen(3000, (err)=> {
    // if(err){
    //     console.log(err)
    // }
    err ? console.log(err) : console.log("connected on port 3000")
})