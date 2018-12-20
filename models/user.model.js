const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 5;


// const server = 'ds135844.mlab.com:35844'
// const database = 'loginsystem'
// const user = 'sam'
// const password = 'love2code28'



// mongoose.connect (`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true })
// mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    userEmail: {
      type: String,
      trim:true,
      required: true,
      unique: true
    },
    userName: {
        type: String,
        trim:true,
        required: true,
        unique: true
      },
    userPassword: {
      type: String,
      default: '',
      required: true,
    },
    heritage: {
      type: String,
      trim:true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    signUpDate: {
      type: Date,
      default: Date.now().toString()
    }
  });


// hash user password before saving into database
userSchema.pre('save', function(next){
  this.userPassword = bcrypt.hashSync(this.userPassword, saltRounds);
  next();
  });




  // userSchema.methods.generateHash = function(userPassword) {
  //   return bcrypt.hashSync(userPassword, bcrypt.genSaltSync(8), null);
  // };
  // userSchema.methods.validPassword = function(userPassword) {
  //   return bcrypt.compareSync(userPassword, this.userPassword);
  // };


  module.exports = mongoose.model('Users', userSchema);
