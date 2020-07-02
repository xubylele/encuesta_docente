const mongoose = require('mongoose')

const teachersBadgeSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParticipantList'
    },  //id_profesor
    badge: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Badge'
    },  // id_insignia
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('TeachersBadge', teachersBadgeSchema)