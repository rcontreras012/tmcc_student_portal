const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    gcode: {
        required: true,
        type: String
    },
    secCode: {
        required: true,
        type: String
    },
    image: {
        require: true,
        type: String
    },
    name:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model('map', dataSchema)      