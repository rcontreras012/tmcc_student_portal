const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    student_id: {
        required: true,
        type: String
    },
    // school term date and year
    term:{
        required: true,
        type: String,
    },
    subject:{
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('studentRecord', dataSchema)      