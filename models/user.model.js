const mongoose = require('mongoose')




const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
    userEmail: {
      type: String,
      trim:true,
      required: [true, 'Email field is required'],
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      // index:true, 
      // sparse:true
    },
    userName: {
        type: String,
        trim:true,
        required: [true, 'Username field is required'],
        unique: true,
        // index:true, 
        // sparse:true
      },
    userPassword: {
      type: String,
      required:[true, 'Password field is required']
 
    },
    heritage: {
      type: String,
      trim:true,
      required:  [true, 'Heritage field is required']
 
    },
    userImage:{
      type: String,
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
