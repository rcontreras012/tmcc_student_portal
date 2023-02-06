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
    sy: {
        required: true,
        type: String
    },
    first:{
        required: false,
        type: String
    },
    second:{
        required: false,
        type: String
    },
    third:{
        require: false,
        type: String
    },
    fourth:{
        require: false,
        type: String
    },
    subject:{
        type: true,
        type: String
    },
    LRNNumber:{
        require: true,
        type: String
    }
    
})

module.exports = mongoose.model('grade', dataSchema)      