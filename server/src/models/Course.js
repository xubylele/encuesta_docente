const mongoose = require('mongoose')
const { func } = require('@hapi/joi')

const courseSchema = new mongoose.Schema({
    acronym: {
        type: String,
        required: true,
        min: 3,
        max: 10,
        unique: true
    },
    name: {
        type: String,
        required: true,
        min:3, 
        max: 12
    },
    semesterCourses: [
        {type: mongoose.Schema.Types.ObjectId, ref:'SemesterCourse'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Course', courseSchema)