const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sy:{
        require: true,
        type: String
    },
    first: {
        require: true,
        type: Boolean
    },
    second: {
        require: true,
        type: Boolean
    },
    third: {
        require: true,
        type: Boolean
    },
    fourth: {
        require: true,
        type: Boolean
    }
    
})

module.exports = mongoose.model('term', dataSchema)      