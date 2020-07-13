const express = require('express')
const router = express.Router()
const { QuestionSetController } = require('../controllers')

    router.post('/create', QuestionSetController.create)
    router.get('/removeAllArrays', QuestionSetController.removeArrays)

module.exports = router