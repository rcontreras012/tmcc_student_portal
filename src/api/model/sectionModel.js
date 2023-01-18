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
    secName:{
        required: true,
        type: String
    },
    term:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model('section', dataSchema)      