const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
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
    timestamps: true 
})

module.exports = mongoose.model('Poll', pollSchema)