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
    timestamps: true 
})

module.exports = mongoose.model('sectionSchema', sectionSchema)