const mongoose = require('mongoose')

const alternativeSetSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        min:1, 
        max: 10
    },  //pregunta
    alternatives: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Question'
    }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Question'
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('AlternativeSet', alternativeSetSchema)