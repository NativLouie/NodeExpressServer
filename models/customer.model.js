const mongoose = require('mongoose')


const server = 'ds135844.mlab.com:35844'
const database = 'loginsystem'
const user = 'sam'
const password = 'love2code28'



mongoose.connect (`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true);
//
//

const CustomerSchema  = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)