const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

    router.get('/getallpolls',pollController.getAllPolls);
    router.get('/:id/get',pollController.getPoll);
    router.post('/create',pollController.createPoll);
    router.put('/:id/setstate',pollController.setState);
    router.delete('/delete',pollController.deletePoll);

module.exports = router;