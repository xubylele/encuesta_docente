const express = require('express');
const router = express.Router();
const { QuestionController } = require('../controllers');

    router.post('/create', QuestionController.create);

module.exports = router;