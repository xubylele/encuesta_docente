const mongoose = require('mongoose')

const participantListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },  //ud_usuario
    course: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Course'
    },  // id_curso
    teachersBadge: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'TeachersBadge'
    }],
    polls: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Poll'
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('ParticipantList', participantListSchema)