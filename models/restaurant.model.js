const mongoose = require('mongoose')


const resturantSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        trim:true,
        unique: true,
    },
    location: {
      coordinates: {
        index: "2dsphere",
        type: [Number]
        },
    }
    //     address:{
    //         type: String,
    //         trim:true,
    //         unique: true,
    //     },
    //     city:{
    //         type: String,
    //         trim:true,
    //     },
    //     state:{
    //         type: String,
    //         trim:true,
    //     },
    //     zipCode:{
    //         type: Number,
    //         trim:true,

    //     },
    //     country:{
    //         type: String,
    //         trim:true,
    //     },
    // },
    // phoneNumber:{
    //     type: Number,
    //     trim:true,
    // },
    // category:{
    //     foodType: {
    //         type:[ String],
    //         trim:true,
    //         required: true,
    //     },
    //     country: {
    //     type: String,
    //     trim:true,
    //     required: true,
    //     },
    // },
});

module.exports = mongoose.model('Restaurants', resturantSchema)