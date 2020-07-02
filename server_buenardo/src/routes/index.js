const express = require('express')
const router = express.Router()
const { AuthController} = require('../controllers')
const auth = require('../middlewares/auth')

module.exports = app => {
    
    router.post('/api/register', AuthController.register)
    router.post('/api/login', AuthController.login)
    router.get('/api/profile', auth, AuthController.profile)


    app.use(router)
     app.use('/api/users',require('../routes/UserRouter'));
     app.use('/api/participantlist',require('../routes/ParticipantListRouter'));
    // app.use('/api/ensign',require('../routes/ensignRoutes'));
    // app.use('/api/courses',require('../routes/courseRoutes'));
    // app.use('/api/polls',require('../routes/pollRouter'));
    // app.use('/api/semestercourse', require('../routes/semesterCourseRouter'));
    // app.use('/api/userensigns',require('../routes/userEnsignsRoutes'));
    // app.use('/api/questionset', require('../routes/questionSetRouter'));
    // app.use('/api/question', require('../routes/questionRouter'));

}