const mongoose = require('mongoose')

const alternativeSchema = new mongoose.Schema({
    alternative: {
        type: Number,
        required: true,
        min:0, 
        max: 5
    },  //alternativa
    answers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Answer'
    }],
    alternativeSet: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'AlternativeSet'
    },  // setAlternativas_id
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('Alternative', alternativeSchema)