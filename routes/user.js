const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = require('../config/imagestorage.config');
const fileFilter = require('../config/imagefilter.config');
const upload = multer({ storage: storage, limits: {fileSize: 1024 * 1024 * 5}, fileFilter: fileFilter});
const UserModel = require('../models/user.model');






//create a new user
//post localhost:3000/user/signup
//post method 1
//Sign up with info & image upload
// todo ~> if email already exists return proper error
//-----------------------------------
//CREAT NEW USER
// //-----------------------------------
router.post("/signup", upload.single('userImage'), (req, res, next) => {
    UserModel.find({ userEmail: req.body.userEmail } && { userName: req.body.userName})
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Email address or username is taken"
          });
        } else {
          bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
                const user = new UserModel({
                    _id:  new mongoose.Types.ObjectId(),
                    userEmail: req.body.userEmail,
                    userName: req.body.userName,
                    userPassword: hash,
                    heritage: req.body.heritage,
                    userImage: req.file.path
                }); 
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message:"User has been sucessfully created",
                    // userCreated: {
                    //     _id: result._id,
                    //     userEmail: result.userEmail,
                    //     userName: result.userName,
                    //     userPassword: result.userPassword,
                    //     heritage: result.heritage,
                    //     userImage: result.userImage,
                    //     response:{
                    //         method: "POST",
                    //         url: "http://localhost:3000/user/signup/" + result._id
                    //     }
                    // }
                })
             })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });
  



//create a new user
//post localhost:3000/user
//post method 2
//-----------------------------------
//CREAT NEW USER
//-----------------------------------
// router.post('/', upload.single('userImage'), (req, res, next)=> {
//     const user = new UserModel({
//         userEmail: req.body.userEmail,
//         userName: req.body.userName,
//         userPassword: req.body.userPassword,
//         heritage: req.body.heritage,
//         userImage: req.file.path
//     }); 
//     user
//     .save()
//     .then(result => {
//         console.log(result);
//         res.status(201).json({
//             message:"User has been sucessfully created",
//             userCreated: {
//                 _id: result._id,
//                 userEmail: result.userEmail,
//                 userName: result.userName,
//                 userPassword: result.userPassword,
//                 heritage: result.heritage,
//                 userImage: result.userImage,
//                 response:{
//                     method: "POST",
//                     url: "http://localhost:3000/user/" + result._id
//                 }
//             }
//         })
//     })
//     .catch(err =>{
//          console.log(err);
//          res.status(500).json({ error: err})
        
//     })
    
// })





//create a new user
//post localhost:3000/user
//post method 3
//-----------------------------------
//CREAT NEW USER
//-----------------------------------
// router.post('/', (req, res, next)=> {
//     if(!req.body){
//         return res.send(status[400])
//     }
//     const model = UserModel(req.body)
//     model
//     .save()
//     .then(doc =>{
//         if(!doc || doc.length === 0){
//             return res.status(500).send(doc)
//         }
//         //status sent when object is created
//         // res.status(201).send(doc)
//         res.status(201).json({
//             message:"Post requests ENDPOINT",
//             userCreated: doc
//         })
//     })
//     //if empty request is sent this is the block sent back
//     .catch(err =>{
//         res.status(500).json(err)
//     })
// })







//Login User
//post localhost:3000/user/login
//post method 1
// ~> logs in with username or useremail
//-----------------------------------
//Login Existing USER
//-----------------------------------

router.post("/login", (req, res, next) => {
    UserModel.find({ userEmail: req.body.userEmail} && { userName: req.body.userName})
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Authentication was unsuccessful"
          });
        }
        bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Authentication was unsuccessful"
            });
          }
          if (result) {
          
            const token = jwt.sign(
              {
                userEmail: user[0].userEmail,
                userName: user[0].userName,
                _id: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              },
            );
            return res.status(200).json({
              message: "User authentication was successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Authentication was unsuccessful"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  


















//update USER password
//post localhost:3000/user
// this method for user name and email
//doesnt work on passwords
//-----------------------------------
//Update USER userName & Email
//-----------------------------------
router.put('/:userId', (req, res, next)=> {
    const id = req.params.userId;
    const updateOps = {};
    for ( const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    UserModel.update({ _id:id }, { $set:  updateOps })
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"UserName & Email Sucessfully Updated",
            request:{
                type:"PUT/GET",
                url: "http://localhost:3000/user/" + id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err})
    });

   

})

//get a USER
//post localhost:3000/user/UserId
//-----------------------------------
//Delete USER
//-----------------------------------
router.delete("/:userId", (req, res, next) => {
    UserModel.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User account deleted"
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