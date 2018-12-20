const CustomerModel = require('../models/customer.model')
const express = require('express')
const router = express.Router()


//create a new customer
//post localhost:3000/customer
//-----------------------------------
//CREAT NEW CUSTOMER
//-----------------------------------
router.post('/customer', (req, res)=>{

    if(!req.body){
        return res.send(status[400])
    }
    const model = CustomerModel(req.body)
    model.save()
    .then(doc =>{
        if(!doc || doc.length === 0){
            return res.status(500).send(doc)
        }
        //status sent when object is created
        res.status(201).send(doc)
    })
    //if empty request is sent this is the block sent back
    .catch(err =>{
        res.status(500).json(err)
    })
})


//-----------------------------------
//GET EXISTING CUSTOMER
//-----------------------------------
router.get('/customer', (req,res)=>{
    if(!req.query.email){
        return res.status(400).send('missing URL parameter: email')
    }
    CustomerModel.findOne({
        email: req.query.email
    })
    .then(doc =>{
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


//-----------------------------------
//UPDATE EXISTING CUSTOMER
//-----------------------------------

router.put('/customer', (req,res)=>{
    if(!req.query.email){
        return res.status(400).send('missing URL parameter: email')
    }
    CustomerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body,{
        new: true
    })
    .then(doc =>{
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


//-----------------------------------
//DELETE EXISTING CUSTOMER
//-----------------------------------
router.delete('/customer', (req,res)=>{
    if(!req.query.email){
        return res.status(400).send('missing URL parameter: email')
    }
    CustomerModel.findOneAndRemove({
        email: req.query.email
    }, req.body,{
        new: true
    })
    .then(doc =>{
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router