const express = require('express');
const router = express.Router();
const { QuestionSetController } = require('../controllers');

    router.post('/create', QuestionSetController.create);

module.exports = router;