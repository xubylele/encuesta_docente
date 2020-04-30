const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    period: {
        type: Number,
        required: true,
        max: 1
    },
    state: {
        type: Boolean,
        required: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    QuestionSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionSet'
    },
    SemesterCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SemesterCourse'
    },
    timestamps: true 
})

module.exports = mongoose.model('Poll', pollSchema)