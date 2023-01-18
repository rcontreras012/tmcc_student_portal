const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    gcode: {
        required: true,
        type: String
    },
    gradeName: {
        required: true,
        type: String
    },
    term:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model('grade', dataSchema)      