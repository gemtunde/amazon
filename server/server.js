const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

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
    console.log(req.body.name)
})


//port
app.listen(3000, (err)=> {
    // if(err){
    //     console.log(err)
    // }
    err ? console.log(err) : console.log("connected on port 3000")
})