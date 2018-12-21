const multer = require('multer');

const  fileFilter = (req, file, cb) => {
    if ( file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
        cb(null, true)
    } else {
        cb(new Error('Only JGEG & PNG Allowed'),null, false)  
    } 

};




module.exports = fileFilter;