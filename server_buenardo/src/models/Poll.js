const mongoose = require('mongoose')

const participantListSchema = new mongoose.Schema({
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
        required: true,
        min:3, 
        max: 100
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('ParticipantList', participantListSchema)