const express = require('express');
const router = express.Router();
const { SectionController } = require('../controllers');

    router.post('/create', SectionController.create);

module.exports = router;