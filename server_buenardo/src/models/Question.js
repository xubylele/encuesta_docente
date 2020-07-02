const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        min:1, 
        max: 250
    },  //pregunta
    answers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Question'
    }],
    section: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Section'
    }, //seccion_id
    alternativeSet: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'AlternativeSet'
    }, //setAlternativas_id
    questionSet: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'QuestionSet'
    }, //setPreguntas_id
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('QuestionSet', questionSetSchema)