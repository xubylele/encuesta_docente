const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    Alternative: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    timestamps: true 
})

module.exports = mongoose.model('questionSchema', questionSchema)