const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const storage = require('../config/imagestorage.config');
const fileFilter = require('../config/imagefilter.config');
const upload = multer({ storage: storage, limits: {fileSize: 1024 * 1024 * 5}, fileFilter: fileFilter});
const jwt = require('jsonwebtoken');
const RestaurantModel = require('../models/restaurant.model');
const authentication = require('../middleware/authentication')




//GET a Restaurants
//GET localhost:3000/businesses/restaurants
// get method 1 (cleaner response)
//-----------------------------------
//GET All restaurants 
//-----------------------------------
router.get('/restaurants', (req, res, next)=> {
    RestaurantModel.find()
    .select(" _id name location ")
    .exec()
    .then(items => {
        console.log( items);
            res.status(200).json({
                count: items.length,
                restaurants: items.map(item =>{
                    return {
                        message: "Restaurants sucessfully retrieved",
                        restaurantsRetrieved: {
                        _id: item._id,
                        name: item.name,
                        location: item.location,
                        // phoneNumber: item.phoneNumber,
                        // category: item.category,
                        response:{
                            method: "GET",
                            url: "http://localhost:3000/businesses/restaurants" + item._id
                        }
                        }
                    }
                })
            })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: err})
    })
})











// //GET a USER
// //GET localhost:3000/user/_id
// get method 2
// //-----------------------------------
// //Find USER by params _id
// //-----------------------------------
// router.get('/:userId', (req, res, next)=> {
//     const id = req.params.userId;
//     UserModel.findById(id)
//     .select("userEmail userName userPassword ")
//     .exec()
//     .then(doc => {
//         console.log("from Database", doc);
//         if (doc) {
//             res.status(200).json({
//                 message:"GET requests ENDPOINT",
//                 userRetrieved: doc
//             })
//         }else {
//             res.status(404).json({
//                 message:" Entry not found",
//             })
//         }
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({ error: err})
//     })
// })





//GET a Restaurants
//GET localhost:3000/businesses/restaurants
// get method 1 (cleaner response)
//-----------------------------------
//CREATE/ALL a restaurants 
//-----------------------------------

router.post("/restaurants", (req, res, next) => {
    const restaurant = new RestaurantModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      location: req.body.location,
      
    });
    restaurant
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Restaurant was successfully added",
          addedRestaurant: {
            _id: result._id,
            name: result.name,
            location: req.location,
              request: {
                  type: 'POST',
                  url: "http://localhost:3000/businesses/restaurants/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });







module.exports = router;