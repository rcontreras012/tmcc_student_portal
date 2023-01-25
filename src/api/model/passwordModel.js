const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    code:{
        require: true,
        type: String
    },
    date:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model('forgetpass', dataSchema)      