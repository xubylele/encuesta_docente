const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const auth = require('../middlewares/auth')

module.exports = app => {
    
    router.post('/api/register', AuthController.register)
    router.post('/api/login', AuthController.login)
    router.get('/api/profile', auth, AuthController.profile)
    app.use(router)

}