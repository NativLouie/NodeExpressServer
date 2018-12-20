const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.model')


//create a new user
//post localhost:3000/user
//-----------------------------------
//CREAT NEW USER
//-----------------------------------
router.post('/', (req, res, next)=> {
    const user ={
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        heritage: req.body.heritage,
    };
    res.status(201).json({
        message:"Post requests ENDPOINT",
        userCreated: user
    })
})


//create a new user
//post localhost:3000/user
//-----------------------------------
//CREAT NEW USER
//-----------------------------------
// router.post('/', (req, res, next)=> {
//     if(!req.body){
//         return res.send(status[400])
//     }
//     const model = UserModel(req.body)
//     model.save()
//     .then(doc =>{
//         if(!doc || doc.length === 0){
//             return res.status(500).send(doc)
//         }
//         //status sent when object is created
//         res.status(201).send(doc)
//     })
//     //if empty request is sent this is the block sent back
//     .catch(err =>{
//         res.status(500).json(err)
//     })
//     // res.status(200).json({
//     //     message:'handling POST request to create user /user'
//     // })
// })





//get a USER
//post localhost:3000/user
//-----------------------------------
//Find USER
//-----------------------------------
router.get('/', (req, res, next)=> {
    res.status(200).json({
        message:'handling GET request to create user /user'
    })
})



//update USER password
//post localhost:3000/user
//-----------------------------------
//Update USER Password
//-----------------------------------
router.put('/', (req, res, next)=> {
    res.status(200).json({
        message:'handling GET request to create user /user'
    })

})

//get a USER
//post localhost:3000/user
//-----------------------------------
//Find USER
//-----------------------------------
router.get('/:userId', (req, res, next)=> {
    const id = req.params.userId;

    res.status(200).json({
        message:'handling GET request to create user /user'
    })
})

module.exports = router;