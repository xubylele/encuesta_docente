const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParticipantList'
    },  //id_profesor
    questionSet: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'QuestionSet'
    },  // setPreguntas_id
    answers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Answer'
    }],
    type: {
        type: String,
        min:3, 
        max: 100
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('Poll', pollSchema)