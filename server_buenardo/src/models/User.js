const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
        min: 3,
        max: 10
    }, //nombres
    last_names: {
        type: String,
        required: true,
        min:3, 
        max: 12
    }, //apellidos
    email: {
        type: String,
        required: true,
        min:8,
        max: 255,
        unique: true
    }, //gmail
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    }, //password
    participants: [
        {type: mongoose.Schema.Types.ObjectId, ref:'ParticipantList'}
    ],
    type: {
        type: String,
        required: true,
        min:1,
        max: 255
    }, //tipo
    timestamp: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }else
        next()
})

module.exports = mongoose.model('User', userSchema)