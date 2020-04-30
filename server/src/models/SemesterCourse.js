const mongoose = require('mongoose')

const semesterCourse = new mongoose.Schema({
    course_acronym: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    semester: {
        type: Number,
        required: true,
        max: 1
    },
    semester: {
        type: Number,
        required: true,
        max: 1
    },
    semester: {
        type: Number,
        required: true,
        max: 1
    },
    parallel: {
        type: Number,
        required: true,
        max: 1  
    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    polls: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Poll'}
    ],
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref:'ParticipantList'}
    ],
    timestamps: true 
})

module.exports = mongoose.model('SemesterCourse', semesterCourse)