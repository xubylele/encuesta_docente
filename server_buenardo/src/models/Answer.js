const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    commentary: {
        type: String,
        min:0, 
        max: 250
    },  //comentario
    alternative: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Alternative'
    },  // alternativa_id
    question: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Question'
    },  // pregunta_id
    poll: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Poll'
    },  // encuesta_id
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('Answer', answerSchema)