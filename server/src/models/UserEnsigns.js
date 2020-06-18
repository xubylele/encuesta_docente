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
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('UserEnsigns', userEnsignsSchema)