const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sy:{
        require: true,
        type: String
    },
    first: {
        require: true,
        type: String
    },
    second: {
        require: true,
        type: String
    },
    third: {
        require: true,
        type: String
    },
    fourth: {
        require: true,
        type: String
    }
    
})

module.exports = mongoose.model('term', dataSchema)      