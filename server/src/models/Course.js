const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    acronym: {
        type: String,
        required: true,
        min: 3,
        max: 10
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
    timestamps: true 
})

module.exports = mongoose.model('Course', courseSchema)