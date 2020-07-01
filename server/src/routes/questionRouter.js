const express = require('express');
const router = express.Router();
const questionController = require('../controllers/QuestionController');

    router.post('/create',questionController.create);
    router.get('/getallquestions',questionController.getAllQuestions);

module.exports = router;