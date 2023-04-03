const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


//get data from the server
app.get('/', (req,res) => {
    res.json("hello amazon clone")
});

//post data from frontend to server
app.post("/", (req, res)=> {
   let user = new User();
   user.name = req.body.name ;
   user.email = req.body.email ;
   user.password = req.body.password ;

//    user.save(err=>{
//     err ? res.json(err) : res.json("user successfully saved");
//    })
   user.save()
   .then(()=>res.json("user saved successful"))
   .catch(err=>console.log(err))

})


//port
app.listen(3000, (err)=> {
    // if(err){
    //     console.log(err)
    // }
    err ? console.log(err) : console.log("connected on port 3000")
})