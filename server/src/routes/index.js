const express = require('express')
const router = express.Router()
const { AuthController} = require('../controllers')
const auth = require('../middlewares/auth')

module.exports = app => {
    
    router.post('/api/register', AuthController.register)
    router.post('/api/login', AuthController.login)
    router.get('/api/profile', auth, AuthController.profile)


    app.use(router)
    app.use('/api/users',require('../routes/userRoutes'));
    app.use('/api/ensign',require('../routes/ensignRoutes'));
    app.use('/api/courses',require('../routes/courseRoutes'));
    app.use('/api/polls',require('../routes/pollRouter'));
    app.use('/api/semesterCourse', require('../routes/semesterCourseRouter'))

}