const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:1, 
        max: 50
    },  //nombre
    questions: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Question'
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('QuestionSet', questionSetSchema)