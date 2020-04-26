const express = require('express')
const router = express.Router()
const {UserController} = require('../controllers/index')

module.exports = app => {
    
    router.get('/api/users', UserController.getUsers)
    
    app.use(router)
}