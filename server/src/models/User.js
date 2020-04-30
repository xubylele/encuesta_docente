const mongoose = require('mongoose')

const USER_TYPEPS = ['STUDIENT_TYPE', 'TEACHER_TYPES', 'DIRECTOR_TYPE']

const userSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    last_names: {
        type: String,
        required: true,
        min:3, 
        max: 12
    },
    email: {
        type: String,
        required: true,
        min:8,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    type: {
        type: String,
        required: true,
        max: 255
    },
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref:'ParticipantList'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)