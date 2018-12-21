const mongoose = require('mongoose')




const addBusinessModel = new mongoose.Schema({
    businessName: {
      type: String,
      trim:true,
      required: true,
      unique: true,
    },
    location: {
        address1:{
            type: Number,
            trim:true,
            unique: true,

        },
        address2:{

        },
        address3:{

        },
        city:{

        },
        zipCode:{

        },
        country:{

        },
        state:{

        },
        
    },
    phoneNumber:{

    },
    image_url: {
    },
    website:{

    },
    socialMedia:{
        instagram:{

        },
        facebook:{

        },
        twitter:{

        },
            
    },
    categories: {
      type: String,
      trim:true,
      required: true,
    },
    
    dateCreated: {
      type: Date,
      default:  Date.now()
      
    }
  });


  module.exports = mongoose.model('NewBusinesses', NewBusinessSchema);