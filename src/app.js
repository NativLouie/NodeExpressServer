const express = require('express'); //express light weight server
const bodyParser = require('body-parser'); // pasrse incoming json give access to req.body
const path = require('path'); //reference path/file directory
const mongoose = require('mongoose') //schema 
const morgan = require('morgan') //http request logger ??
const fs = require('fs'); //file system for node ??
const status = require('http-status')
const personRoute = require('../routes/person'); //import statement
const CustomerRoute = require('../routes/customer'); //import statement
const userAccount = require('../routes/user');


const app = express() // initialize express

mongoose.connect(
    'mongodb://sam:'+ 
    process.env.MONGO_MLAB_PW + '@ds135844.mlab.com:35844/loginsystem', { useNewUrlParser: true })
mongoose.set('useCreateIndex', true);

//now.sh ~> deloy




//creates log file with more "combined"
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(personRoute)
app.use(CustomerRoute)
app.use(express.static('public'))




//-----------------------------------
//CORS ~> cross origin resources access
//-----------------------------------
// 

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header(
         'Access-Control-Allow-Methods',
         'GET, POST, PUT','DELETE');
         return res.status(200).json({});
    }
    next()
});







//-----------------------------------
//Routes
//-----------------------------------
// 
app.use('/user', userAccount);






//-----------------------------------
//handler for error 400
//-----------------------------------
// 
app.use((req, res, next) =>{
    const error = new Error ('Not found');
    error.status = 400;
    next(error);
})





//-----------------------------------
//handler for error 500
//-----------------------------------
// 
app.use((error,req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})







module.exports = app;





