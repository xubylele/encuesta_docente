const mongoose = require('mongoose')

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
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref:'ParticipantList'}
    ],
    polls: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Poll'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)