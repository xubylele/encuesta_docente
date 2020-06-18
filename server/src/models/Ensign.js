const mongoose = require('mongoose')

const ensignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:3, 
        max: 12
    },
    userEnsigns: [
        {type: mongoose.Schema.Types.ObjectId, ref:'UserEnsigns'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Ensign', ensignSchema)