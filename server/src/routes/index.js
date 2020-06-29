const express = require('express')
const router = express.Router()
const { AuthController, UserController } = require('../controllers')
const auth = require('../middlewares/auth')

module.exports = app => {
    
    router.post('/api/register', AuthController.register)
    router.post('/api/login', AuthController.login)
    router.get('/api/profile', auth, AuthController.profile)

    router.delete('/api/user/delete', UserController.remove)

    app.use(router)

}