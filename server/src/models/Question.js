const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    questionSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionSet'
    },
    alternativeSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AlternativeSet'
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    answers: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Answer'}
    ],
    timestamps: true 
})

module.exports = mongoose.model('questionSchema', questionSchema)