const mongoose = require('mongoose')

const questionSetSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    questions: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Question'}
    ],
    polls: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Poll'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('QuestionSet', questionSetSchema)   