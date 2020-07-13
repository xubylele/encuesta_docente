const express = require('express')
const router = express.Router()
const { QuestionController } = require('../controllers')

    router.post('/create', QuestionController.create)
    router.post('/createMuch', QuestionController.createMuch)
    router.get('/removeAllArrays',  QuestionController.removeArrays)

    /**
    * Mandas el id de la pregunta, y te paso las alternativas
    */
    router.get('/:id/getAlternatives', QuestionController.getAlternatives)

module.exports = router