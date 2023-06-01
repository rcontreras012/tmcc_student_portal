const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    schoolYear: {
        required: true,
        type: String
    },

})

module.exports = mongoose.model('schoolyear', dataSchema)      