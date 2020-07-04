const express = require('express');
const router = express.Router();
const { QuestionController } = require('../controllers');

    router.post('/create', QuestionController.create);

    /**
    * Mandas el id de la pregunta, y te paso las alternativas
    */
    router.get('/:id/getAlternatives', QuestionController.getAlternatives)

module.exports = router;