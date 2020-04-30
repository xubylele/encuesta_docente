const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    QuestionSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionSet'
    },
    AlternativeSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AlternativeSet'
    },
    answers: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Answer'}
    ],
    timestamps: true 
})

module.exports = mongoose.model('questionSchema', questionSchema)