const express = require('express');
const router = express.Router();
const { ParticipantListController } = require('../controllers');

    router.post('/create', ParticipantListController.create);

module.exports = router;