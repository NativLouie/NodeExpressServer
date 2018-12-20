const express = require('express')
const router = express.Router()


router.get('/person', (req,res) =>{
    res.send("this is what is SENT from the route")
})

//: let you map to a variable
//params property on object
router.get('/person/:name', (req,res) =>{

    res.send(`you have requested a person ${req.params.name}`)
})


router.get('/error', (req,res) =>{

    throw new Error ('This is a forced error')
})


module.exports = router