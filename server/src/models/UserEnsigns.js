const mongoose = require('mongoose')

const userEnsignsSchema = new mongoose.Schema({
    semesterCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SemesterCourse'
    },
    ensign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ensign'
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParticipantList'
    },
    timestamps: true 
})

module.exports = mongoose.model('UserEnsigns', userEnsignsSchema)