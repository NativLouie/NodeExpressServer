const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

module.exports = storage;

