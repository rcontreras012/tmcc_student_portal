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
    studentID: {
        required: true,
        type: String
    },
    SchoolYear: {
        required: true,
        type: String
    },
    
})

module.exports = mongoose.model('grade', dataSchema)      