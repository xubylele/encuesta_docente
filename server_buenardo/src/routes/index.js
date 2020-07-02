const express = require('express')
const router = express.Router()
const { AuthController} = require('../controllers')
const auth = require('../middlewares/auth')

module.exports = app => {
    
    router.post('/api/register', AuthController.register)
    router.post('/api/login', AuthController.login)

    app.use(router)
    app.use('/api/users',require('./UserRouter'));
    app.use('/api/participantlist',require('./ParticipantListRouter'));
    app.use('/api/section', require('./SectionRouter'))
    // app.use('/api/ensign',require('../routes/ensignRoutes'));
     app.use('/api/courses',require('../routes/CourseRouter'));
    // app.use('/api/polls',require('../routes/pollRouter'));
    // app.use('/api/semestercourse', require('../routes/semesterCourseRouter'));
    // app.use('/api/userensigns',require('../routes/userEnsignsRoutes'));
    app.use('/api/questionset', require('./QuestionSetRouter'));
    app.use('/api/question', require('../routes/QuestionRouter'));

}