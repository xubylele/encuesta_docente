const mongoose = require('mongoose')

const alternativeSetSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    alternatives: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Alternative'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('AlternativeSet', alternativeSetSchema) 