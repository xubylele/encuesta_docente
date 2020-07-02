const mongoose = require('mongoose')

const questionSetSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        min:1, 
        max: 12
    },  
    polls: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Poll'
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



module.exports = mongoose.model('QuestionSet', questionSetSchema)