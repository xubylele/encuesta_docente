const express = require('express');
const router = express.Router();
const questionSetController = require('../controllers/QuestionSetController');

    router.post('/create',questionSetController.createQuestionSet);
    router.get('/getallquestionsset',questionSetController.getAllQuestionSet);
    router.get('/:id/get',questionSetController.getQuestionSet);
    router.delete('/delete',questionSetController.deleteQuestionSet);
    router.post('/addQuestion',questionSetController.addQuestion);
module.exports = router;