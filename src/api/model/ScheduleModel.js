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
    subject: {
        required: true,
        type: String
    },
    teacher: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String
    },
    order: {
        required: true,
        type: String
    },
    teacher_id:{
        required: true,
        type: String
    },
    sy:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model('schedule', dataSchema)      