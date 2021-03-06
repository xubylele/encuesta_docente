const express = require('express')
const router = express.Router()
const { AuthController} = require('../controllers')
const auth = require('../middlewares/auth')


module.exports = app => {
    
    router.post('/api/register', AuthController.register)


    /**
    * Mandas el correo y la contraseña
    * Devuelve el token y el tipo de usuario
    */
    router.post('/api/login', AuthController.login)
    router.post('/api/forgot_password', AuthController.forgotPassword)

    app.use(router)
    app.use('/api/users',require('./UserRouter'))
    app.use('/api/participantlist',require('./ParticipantListRouter'))
    app.use('/api/section', require('./SectionRouter'))
    app.use('/api/courses',require('./CourseRouter'))
    app.use('/api/polls',require('./PollRouter'))
    // app.use('/api/semestercourse', require('../routes/semesterCourseRouter'))
    app.use('/api/teachersbadge',require('./TeachersBadgeRouter'))
    app.use('/api/questionset', require('./QuestionSetRouter'))
    app.use('/api/alternativeset', require('./AlternativeSetRouter'))
    app.use('/api/question', require('./QuestionRouter'))
    app.use('/api/alternative', require('./AlternativeRouter'))
    app.use('/api/badges',require('./BadgeRouter'))

}