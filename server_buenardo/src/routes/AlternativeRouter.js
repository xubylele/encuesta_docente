const express = require('express');
const router = express.Router();
const { AlternativeController } = require('../controllers');

    router.post('/create', AlternativeController.create);

module.exports = router;