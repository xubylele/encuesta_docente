const mongoose = require('mongoose')

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:3, 
        max: 100
    },
    teachersBadge: [
        {type: mongoose.Schema.Types.ObjectId, ref:'TeachersBadge'}
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('Badge', badgeSchema)