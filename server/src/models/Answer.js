const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true,
        max: 100
    },
    Alternative: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alternative'
    },
    Question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    Poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    },
    timestamps: true 
})

module.exports = mongoose.model('Poll', pollSchema)