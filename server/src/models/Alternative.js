const mongoose = require('mongoose')

const alternativeSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    alternativeSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AlternativeSet'
    },
    answers: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Answer'}
    ],
    timestamps: true 
})

module.exports = mongoose.model('alternativeSchema', alternativeSchema)