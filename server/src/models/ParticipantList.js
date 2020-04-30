const mongoose = require('mongoose')

const participantList = new mongoose.Schema({
    SemesterCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SemesterCourse'
    },
    Participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamps: true 
})

module.exports = mongoose.model('ParticipantList', participantList)