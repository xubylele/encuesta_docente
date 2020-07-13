const express = require('express');
const router = express.Router();
const { AlternativeController } = require('../controllers');

    router.post('/create', AlternativeController.create);
    router.post('/createMuch', AlternativeController.createMuch)
    router.get('/removeAllArrays', AlternativeController.removeArrays)

module.exports = router;