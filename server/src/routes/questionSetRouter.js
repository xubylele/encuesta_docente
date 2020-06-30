const express = require('express');
const router = express.Router();
const questionSetController = require('../controllers/QuestionSetController');

    router.post('/create',questionSetController.createQuestionSet);
    router.get('/getAllQuestionsSet',questionSetController.getAllQuestionSet);
    router.get('/:id/get',questionSetController.getQuestionSet);
    router.delete('/delete',questionSetController.deleteQuestionSet);
module.exports = router;