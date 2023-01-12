const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    contact_no: {
        required: true,
        type: String
    },
    teacher_id_no: {
        required: true,
        type: String
    },
    role: {
        require: true,
        type: Number
    },
    password:{
        require: true,
        type: String
    },
    schoolEmail:{
        require: true,
        type: String
    },
    id:{
        require: true,
        type: String
    }
})

module.exports = mongoose.model('teacher', dataSchema)      