const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true,
        max: 100
    },
    alternative: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alternative'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Answer', answerSchema)