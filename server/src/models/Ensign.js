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
    timestamps: true 
})

module.exports = mongoose.model('Ensign', ensignSchema)