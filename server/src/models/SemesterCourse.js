const mongoose = require('mongoose')

const semesterCourse = new mongoose.Schema({
    semester: {
        type: Number,
        required: true,
        max: 2
    },
    parallel: {
        type: Number,
        required: true,
        max: 2  
    },
    year:{
        type: Number,
        required: true,
        max:2020
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    polls: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Poll'}
    ],
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref:'ParticipantList'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SemesterCourse', semesterCourse)