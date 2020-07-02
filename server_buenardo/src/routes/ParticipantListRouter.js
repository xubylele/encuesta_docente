const express = require('express');
const router = express.Router();
const participantListController = require('../controllers/ParticipantListController');

    router.post('/create',participantListController.create);

module.exports = router;