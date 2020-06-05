const mongoose = require('mongoose')

const participantList = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        max: 255
    },
    semesterCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SemesterCourse'
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userEnsigns: [
        {type: mongoose.Schema.Types.ObjectId, ref:'UserEnsigns'}
    ],
    timestamps: true 
})

module.exports = mongoose.model('ParticipantList', participantList)