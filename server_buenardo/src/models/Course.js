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
        max: 100
    },
    participantsList: [
        {type: mongoose.Schema.Types.ObjectId, ref:'ParticipantList'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('Course', courseSchema)