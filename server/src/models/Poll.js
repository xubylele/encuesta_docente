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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questionSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionSet'
    },
    semesterCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SemesterCourse'
    },
    answers: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Answer'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Poll', pollSchema)