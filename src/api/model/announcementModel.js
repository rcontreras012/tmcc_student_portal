const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    announcement: {
        required: true,
        type: String
    },
    isActive: {
        required: true,
        type: String
    },
    DateAnnounce: {
        required: true,
        type: String
    },
    ExpireDate: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('announcement', dataSchema)      