const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:3, 
        max: 12
    },
    questions: [
        {type: mongoose.Schema.Types.ObjectId, ref:'question'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sectionSchema', sectionSchema)