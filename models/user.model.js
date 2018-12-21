const mongoose = require('mongoose')




const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
    userEmail: {
      type: String,
      trim:true,
      required: true, 
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      index: {unique: true, dropDups: true}
    },
    userName: {
        type: String,
        trim:true,
        required: true,
        unique: true,
        index: {unique: true, dropDups: true}
      },
    userPassword: {
      type: String,
      required:true,
 
    },
    heritage: {
      type: String,
      trim:true,
      required:  [true, 'Heritage field is required']
 
    },
    userImage:{
      type: String,
      trim:true,
      required: [true, 'Image field is required']

    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    signedUpDate: {
      type: Date,
      default:  Date.now()
      
    }
  });

  module.exports = mongoose.model('Users', userSchema);
